

import React, { useState } from 'react';

function App() {
    const [conditions, setConditions] = useState('A,B,C');
    const [expression, setExpression] = useState('A and B or C');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        try {
            const condList = conditions.split(',').map(c => c.trim());
            const res = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conditions: condList, expression })
            });
            if (!res.ok) throw new Error('Failed to fetch MC/DC cases');
            const data = await res.json();
            setResult(data.mcdc_cases);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', padding: 0 }}>
            <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <h1 style={{ textAlign: 'center', color: '#2a5298', marginBottom: 24 }}>MC/DC Scenario Analyzer</h1>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 500, color: '#2a5298' }}>Conditions (comma separated):</label>
                    <input
                        value={conditions}
                        onChange={e => setConditions(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: 6, borderRadius: 8, border: '1px solid #b6c2d9', fontSize: 16 }}
                        placeholder="E.g. A,B,C"
                    />
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 500, color: '#2a5298' }}>Boolean Expression:</label>
                    <input
                        value={expression}
                        onChange={e => setExpression(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: 6, borderRadius: 8, border: '1px solid #b6c2d9', fontSize: 16 }}
                        placeholder="E.g. A and B or C"
                    />
                </div>
                <button
                    style={{ width: '100%', padding: '12px', background: 'linear-gradient(90deg, #2a5298 0%, #1e3c72 100%)', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 10 }}
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze MC/DC'}
                </button>
                {error && <div style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</div>}
                {result && (
                    <div style={{ marginTop: 30 }}>
                        <h2 style={{ color: '#1e3c72', textAlign: 'center', marginBottom: 16 }}>MC/DC Test Cases</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f7fafc', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <thead>
                                    <tr style={{ background: '#e0eafc' }}>
                                        {Object.keys(result[0]).map(cond => <th key={cond} style={{ padding: '10px', color: '#2a5298', fontWeight: 600, borderBottom: '2px solid #b6c2d9' }}>{cond}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((row, idx) => (
                                        <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f0f4fa' }}>
                                            {Object.values(row).map((val, i) => <td key={i} style={{ padding: '10px', textAlign: 'center', color: val ? '#1e3c72' : '#b6c2d9', fontWeight: 500 }}>{val.toString()}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <div style={{ textAlign: 'center', color: '#b6c2d9', marginTop: 24, fontSize: 14 }}>
                &copy; {new Date().getFullYear()} MC/DC Analyzer. All rights reserved.
            </div>
        </div>
    );
}

export default App;
