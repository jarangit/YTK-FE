import PasswordGate from './components/PasswordGate';
import ReportDashboard from './ReportDashboard';

export default function ReportPage() {
  return (
    <PasswordGate>
      <ReportDashboard />
    </PasswordGate>
  );
}
