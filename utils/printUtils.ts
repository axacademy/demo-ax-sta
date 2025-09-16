
export const handlePrint = (reportTitle: string, contentElementId: string) => {
    const printContent = document.getElementById(contentElementId);

    if (printContent) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${reportTitle}</title>
                        <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
                        <style>
                            body { 
                                font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
                                margin: 2cm; 
                                color: #333;
                            }
                            h1, h2, h3, h4 {
                                color: #000;
                                page-break-after: avoid;
                            }
                            h1 { font-size: 28px; text-align: center; margin-bottom: 24px; }
                            h2 { font-size: 22px; border-bottom: 2px solid #eee; padding-bottom: 8px; margin-top: 32px; }
                            h3 { font-size: 18px; color: #111; margin-top: 24px; }
                            ul { padding-left: 20px; list-style-position: outside; }
                            li { margin-bottom: 8px; line-height: 1.6; }
                            p { line-height: 1.6; margin: 12px 0; }
                            strong { color: #000; font-weight: 600; }
                            .profile-section {
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                padding: 16px 24px;
                                margin-bottom: 32px;
                                background-color: #f9f9f9;
                            }
                            .profile-section ul {
                                list-style: none;
                                padding-left: 0;
                            }
                            .profile-section li {
                                padding: 4px 0;
                            }
                            .profile-section strong {
                                display: inline-block;
                                width: 180px;
                            }
                            .page-break {
                                page-break-before: always;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 24px 0;
                                font-size: 14px;
                                page-break-inside: auto;
                            }
                            thead {
                                display: table-header-group; /* Repeat headers on each page */
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            th, td {
                                border: 1px solid #ddd;
                                padding: 10px 12px;
                                text-align: left;
                                vertical-align: top;
                                line-height: 1.5;
                            }
                            th {
                                background-color: #f5f5f5;
                                font-weight: 600;
                            }
                            hr {
                                border: none;
                                border-top: 1px solid #eee;
                                margin: 32px 0;
                            }
                             @page {
                                size: A4;
                                margin: 0;
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    }
};
