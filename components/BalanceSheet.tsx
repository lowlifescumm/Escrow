import React from 'react';

interface SectionItem {
  label: string;
  value: number | null;
  isSubItem?: boolean;
}

export interface BalanceSheetData {
  [category: string]: SectionItem[];
}

interface BalanceSheetProps {
  companyName?: string;
  data?: BalanceSheetData | null;
}

interface FinancialSectionProps {
  title: string;
  items: SectionItem[];
  totalLabel: string;
}

const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
};

const calculateTotal = (items: SectionItem[] = []): number => {
  return items.reduce((sum, item) => sum + (item.value || 0), 0);
};

const FinancialSection: React.FC<FinancialSectionProps> = ({ title, items, totalLabel }) => {
  const totalValue = calculateTotal(items);
  return (
    <div className="mb-6">
      <h4 className="bg-gray-700 dark:bg-slate-600 text-white font-bold uppercase text-xs p-2 rounded-t-lg">
        {title}
      </h4>
      <div className="border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
        <table className="w-full text-sm">
          <tbody>
            {items && items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <td className={`p-2 ${item.isSubItem ? 'pl-6' : ''} text-gray-700 dark:text-gray-300`}>
                  {item.label}
                </td>
                <td className="p-2 text-right font-mono text-gray-900 dark:text-gray-100">
                  {formatCurrency(item.value)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 dark:bg-gray-700/50 font-bold">
              <td className="p-2 text-gray-800 dark:text-gray-200">{totalLabel}</td>
              <td className="p-2 text-right font-mono text-gray-900 dark:text-white">{formatCurrency(totalValue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GrandTotalRow: React.FC<{label: string; value: number}> = ({label, value}) => (
    <div className="bg-gray-200 dark:bg-gray-900/80 mt-2 p-2 rounded-lg flex justify-between items-center font-bold">
        <span className="text-gray-800 dark:text-gray-200">{label}</span>
        <span className="font-mono text-lg text-gray-900 dark:text-white">{formatCurrency(value)}</span>
    </div>
)

const BalanceSheet: React.FC<BalanceSheetProps> = ({ companyName = 'Your Company', data = null }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="text-center p-6 text-gray-500 dark:text-gray-400">
                <p>No financial data available to display.</p>
            </div>
        );
    }
    
    // Updated keys to lowercase to match the Google Sheet 'category' column values.
    const currentAssets = data['current assets'] || [];
    const fixedAssets = data['fixed assets'] || [];
    const otherAssets = data['other assets'] || [];
    
    const currentLiabilities = data['current liabilities'] || [];
    const longTermLiabilities = data['long term liabilities'] || [];
    const ownerEquity = data["owner equity"] || [];

    // "Other Assets" are intentionally excluded from the Total Assets calculation per user requirements.
    const totalAssets = calculateTotal(currentAssets) + calculateTotal(fixedAssets);
    const totalLiabilities = calculateTotal(currentLiabilities) + calculateTotal(longTermLiabilities);
    const totalEquity = calculateTotal(ownerEquity);
    const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  return (
    <div>
        <h3 className="text-center font-bold text-lg text-gray-800 dark:text-white mb-1">BALANCE SHEET</h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">{companyName.toUpperCase()}</p>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            {/* ASSETS COLUMN */}
            <div>
                <FinancialSection
                    title="Current Assets"
                    items={currentAssets}
                    totalLabel="Total Current Assets"
                />
                 <FinancialSection
                    title="Fixed Assets"
                    items={fixedAssets}
                    totalLabel="Total Fixed Assets"
                />
                <GrandTotalRow label="Total Assets" value={totalAssets} />

                {/* Other Assets are displayed separately for informational purposes and not included in Total Assets */}
                {otherAssets.length > 0 && (
                  <div className="mt-6">
                     <FinancialSection
                        title="Other Assets"
                        items={otherAssets}
                        totalLabel="Total Other Assets"
                    />
                  </div>
                )}
            </div>

            {/* LIABILITIES & EQUITY COLUMN */}
            <div>
                 <FinancialSection
                    title="Current Liabilities"
                    items={currentLiabilities}
                    totalLabel="Total Current Liabilities"
                />
                <FinancialSection
                    title="Long-Term Liabilities"
                    items={longTermLiabilities}
                    totalLabel="Total Long-Term Liabilities"
                />
                 <FinancialSection
                    title="Owner's Equity"
                    items={ownerEquity}
                    totalLabel="Total Owner's Equity"
                />
                <GrandTotalRow label="Total Liabilities and Equity" value={totalLiabilitiesAndEquity} />
            </div>
        </div>
         {Math.abs(totalAssets - totalLiabilitiesAndEquity) > 0.01 && (
            <div className="mt-4 text-center p-2 bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400 dark:border-yellow-700 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Warning:</strong> Total Assets do not equal Total Liabilities and Equity. The difference is {formatCurrency(totalAssets - totalLiabilitiesAndEquity)}.
            </div>
        )}
    </div>
  );
};

export default BalanceSheet;
