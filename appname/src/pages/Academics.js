import './Academics.css';

function Academics() {
  const modules = [
    { code: 'BT1101', title: 'Introduction to Business Analytics' },
    { code: 'BT2101', title: 'Econometrics Modelling for Business Analytics' },
    { code: 'BT2102', title: 'Data Management and Visualisation' },
    { code: 'BT2103', title: 'Optimization Methods in Business Analytics' }
  ];

  return (
    <div className="academics-page">
      <div className="academics-content">
        <h1>Academics</h1>
        <div className="table-container">
          <table className="modules-table">
            <thead>
              <tr>
                <th>Module Code</th>
                <th>Module Title</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={index}>
                  <td>{module.code}</td>
                  <td>{module.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Academics;

