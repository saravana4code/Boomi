import React from 'react';
import '../components/DashboardPage.css';
import TitleBar from './TitleBar';
//import { ReactSession } from 'react-client-session';



function DashboardPage() {
  const logstatus = window.sessionStorage.getItem("Login_status");
  //console.log("Result1 "+ logstatus);
  if (logstatus==="true") {
  return (
    <div>
    {/* <TitleBar/> */}
    <div className="col-md-12 center">
       <div className="row" style={{ height: '200px' }}>&nbsp;</div>
      <div className="row">
        <div className="col-xl-4 col-lg-6" onClick={() => window.location = '/AGCompanydetailPage'}>
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large"><i className="fas fa-users"></i></div>
              <div className="mb-4">
                <h5 className="card-title mb-0">View Golden Records</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  {/* <h2 style={{ color: '#407AD9' }} className="d-flex align-items-center mb-0">1</h2> */}
                </div>
                <div className="col-4 text-right">
                  <span>View <i className="fa fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-4 col-lg-6" onClick={() => window.location = '/NewCompanydetailPage'}>
          <div className="card l-bg-green-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large"><i className="fas fa-ticket-alt"></i></div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Create Company</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 style={{ color: '#21A064' }} className="d-flex align-items-center mb-0">2</h2>
                </div>
                <div className="col-4 text-right">
                  <span>View <i className="fa fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-xl-4 col-lg-6" onClick={() => window.location = '/Accordion'}>
          <div className="card l-bg-orange-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large"><i className="fas fa-dollar-sign"></i></div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Principle</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  {/* <h2 style={{ color: '#ECA745' }} className="d-flex align-items-center mb-0">3</h2> */}
                </div>
                <div className="col-4 text-right">
                  <span>View <i className="fa fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
else {
  window.location.replace('/');
}
}
export default DashboardPage;
