export default function ProgressBar({ value = 0, label = '' }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label ? <div className="small text-secondary mb-1">{label}</div> : null}
      <div className="progress tf-progress">
        <div className="progress-bar" role="progressbar" style={{ width: `${safe}%` }}>
          {safe}%
        </div>
      </div>
    </div>
  );
}

