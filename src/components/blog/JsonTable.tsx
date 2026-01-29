interface JsonTableProps {
  data: {
    title?: string;
    jsonData: string;
    columns?: Array<{
      key: string;
      title: string;
      type?: 'text' | 'number' | 'boolean' | 'date' | 'link';
    }>;
  };
}

export function JsonTable({ data }: JsonTableProps) {
  if (!data.jsonData) return null;

  try {
    const jsonData = JSON.parse(data.jsonData);
    
    // Handle array of objects
    if (Array.isArray(jsonData) && jsonData.length > 0) {
      const firstItem = jsonData[0];
      const keys = data.columns?.map(col => col.key) || Object.keys(firstItem);
      const columns = data.columns || keys.map(key => ({ key, title: key, type: 'text' as const }));

      return (
        <div className="my-8 overflow-x-auto">
          {data.title && (
            <h3 className="text-lg font-bold text-dark mb-4">{data.title}</h3>
          )}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-grey-accent">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 text-left text-sm font-semibold text-dark border-b border-gray-200"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jsonData.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"
                      >
                        {renderCellValue(item[column.key], column.type)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Handle single object
    if (typeof jsonData === 'object' && jsonData !== null) {
      const entries = Object.entries(jsonData);
      
      return (
        <div className="my-8 overflow-x-auto">
          {data.title && (
            <h3 className="text-lg font-bold text-dark mb-4">{data.title}</h3>
          )}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {entries.map(([key, value], index) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-dark bg-grey-accent border-b border-gray-200 w-1/3">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                      {renderCellValue(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return null;
  } catch (error) {
    console.error('Error parsing JSON table data:', error);
    return (
      <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading table data</p>
      </div>
    );
  }
}

function renderCellValue(value: any, type?: string) {
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  switch (type) {
    case 'boolean':
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      );
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'link':
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {value}
        </a>
      );
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : value;
    default:
      return String(value);
  }
}