import './Admission.css';

function Admission() {
  const steps = [
    'Understanding Admission requirements',
    'Submit application online',
    'Upload supporting documents',
    'Make application fee payment',
    'Check application status'
  ];

  return (
    <div className="admission-page">
      <div className="admission-content">
        <h1>Admission Timeline</h1>
        <ol className="admission-list">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Admission;

