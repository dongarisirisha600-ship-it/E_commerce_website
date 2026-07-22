import { useEffect, useState } from 'react';
import { readStoredValue, writeStoredValue } from '../utils/storage';
import InventoryManager from './InventoryManager';

function DashboardOverview() {
  const [theme, setTheme] = useState(() => readStoredValue('theme', 'light'));
  const [sessionNote, setSessionNote] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStoredValue('theme', theme);
  }, [theme]);

  useEffect(() => {
    const lastPage = readStoredValue('lastVisitedPage', '/dashboard/overview');
    writeStoredValue('sessionData', { lastVisitedPage: lastPage, activeTab: 'Inventory' });
    setSessionNote(`Last session page: ${lastPage}`);
  }, []);

  return (
    <section>
      <h3>Overview</h3>
      <p>Your recent activity and account summary will appear here.</p>
      <div className="actions" style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </div>
      <p className="success-box">{sessionNote}</p>
      <InventoryManager />
    </section>
  );
}

export default DashboardOverview;
