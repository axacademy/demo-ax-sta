
import React from 'react';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';

export const renderWithMarkdown = (text: string, isPrint = false): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|<br\s*\/?>)/g);
    return parts.map((part, index) => {
        if (part === undefined || part === null) return null;

        if (part.startsWith('**') && part.endsWith('**')) {
            return React.createElement('strong', {
                key: index,
                className: isPrint ? undefined : "font-bold text-cyan-400"
            }, part.slice(2, -2));
        }
        if (part.match(/<br\s*\/?>/)) {
            return React.createElement('br', { key: index });
        }
        return part;
    });
};

export const formatStrategy = (text: string, isPrint = false): React.ReactNode | null => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let tableLines: string[] = [];

    const flushListItems = (key: string) => {
        if (listItems.length > 0) {
            elements.push(React.createElement('ul', { key: key, className: isPrint ? undefined : "space-y-2 my-5 pl-2" }, listItems));
            listItems = [];
        }
    };
    
    const flushTable = (key: string) => {
        if (tableLines.length < 2) { // Need at least header and separator
            tableLines.forEach((line, index) => { // If not a valid table, render as paragraph
                elements.push(React.createElement('p', { key: `${key}-p-${index}`, className: isPrint ? undefined : "text-slate-300 text-lg leading-8 my-5" }, renderWithMarkdown(line, isPrint)));
            });
            tableLines = [];
            return;
        };

        const headerLine = tableLines[0];
        const bodyLines = tableLines.slice(2);

        const headers = headerLine.split('|').slice(1,-1).map(h => h.trim());
        
        const headerElements = headers.map((header, i) => React.createElement('th', { 
            key: `th-${i}`,
            className: isPrint ? undefined : "py-3 px-5 bg-slate-700/50 text-slate-100 font-semibold text-left"
        }, renderWithMarkdown(header, isPrint)));
        
        const bodyElements = bodyLines.map((rowLine, rowIndex) => {
            if (rowLine.trim().startsWith('|--')) return null; // Skip separator line if it's in bodyLines
            const cells = rowLine.split('|').slice(1,-1).map(c => c.trim());
            return React.createElement('tr', { 
                key: `tr-${rowIndex}`,
                className: isPrint ? undefined : "border-b border-slate-700 last:border-b-0 hover:bg-slate-800/50"
            }, cells.map((cell, cellIndex) => React.createElement('td', {
                key: `td-${rowIndex}-${cellIndex}`,
                className: isPrint ? undefined : "py-4 px-5 text-slate-300 align-top"
            }, renderWithMarkdown(cell, isPrint))));
        }).filter(Boolean);

        const table = React.createElement('div', { 
            key: `table-wrapper-${key}`,
            className: isPrint ? undefined : "overflow-x-auto my-6 rounded-lg border border-slate-700" 
        },
            React.createElement('table', { 
                key: `table-${key}`,
                className: isPrint ? undefined : "w-full text-left table-auto"
            }, [
                React.createElement('thead', { key: 'thead' }, React.createElement('tr', { className: isPrint ? undefined : "bg-slate-700" }, headerElements)),
                React.createElement('tbody', { key: 'tbody' }, bodyElements)
            ])
        );
        elements.push(table);
        tableLines = [];
    }

    lines.forEach((line, index) => {
        const key = `line-${index}`;
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
            if (tableLines.length === 0) {
                 flushListItems(`ul-before-table-${key}`);
            }
            tableLines.push(trimmedLine);
            return;
        }

        if (tableLines.length > 0) {
            flushTable(`table-end-${key}`);
        }
        
        if (trimmedLine.match(/^-{3,}$/)) { // Horizontal rule
            flushListItems(`ul-before-hr-${key}`);
            elements.push(React.createElement('hr', { key: key, className: isPrint ? undefined : "my-8 border-slate-700" }));
            return;
        }

        if (trimmedLine === '') {
            flushListItems(`ul-before-empty-${key}`);
            return;
        }

        if (trimmedLine.startsWith('##')) {
            flushListItems(`ul-before-${key}`);
            elements.push(React.createElement('h2', { key: key, className: isPrint ? undefined : "text-3xl font-bold text-white mt-8 mb-4 pb-2 border-b border-slate-700" }, renderWithMarkdown(trimmedLine.replace(/##/g, '').trim(), isPrint)));
        } else if (trimmedLine.startsWith('###')) {
            flushListItems(`ul-before-${key}`);
            elements.push(React.createElement('h3', { key: key, className: isPrint ? undefined : "text-2xl font-semibold text-cyan-400 mt-8 mb-3" }, renderWithMarkdown(trimmedLine.replace(/###/g, '').trim(), isPrint)));
        } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
            const content = renderWithMarkdown(trimmedLine.substring(2), isPrint);
            if (isPrint) {
                 listItems.push(
                    React.createElement('li', { key: key }, '• ', content)
                 );
            } else {
                listItems.push(
                    React.createElement('li', { key: key, className: "flex items-start gap-2" },
                        React.createElement(ChevronRightIcon, { className: "w-4 h-4 text-cyan-500 mt-2 flex-shrink-0" }),
                        React.createElement('span', { className: "text-slate-300 text-lg leading-8" }, content)
                    )
                );
            }
        } else if (/^\d+\.\s/.test(trimmedLine)) {
            flushListItems(`ul-before-${key}`);
            elements.push(React.createElement('p', { key: key, className: isPrint ? undefined : "font-semibold text-slate-200 mt-4 text-lg" }, renderWithMarkdown(trimmedLine, isPrint)));
        } else {
            flushListItems(`ul-before-${key}`);
            elements.push(React.createElement('p', { key: key, className: isPrint ? undefined : "text-slate-300 text-lg leading-8 my-5" }, renderWithMarkdown(trimmedLine, isPrint)));
        }
    });

    flushListItems('ul-end');
    flushTable('table-end');
    return elements;
};
