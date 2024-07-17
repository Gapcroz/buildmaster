import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <main>
      <h1>dashboard</h1>
      <div className="d-flex flex-column">
        <section className="d-flex justify-content-between mb-5">
          <article className="d-flex gap-3">
            <div className="container mt-5">
              <h5 className="text-center mb-3 text-capitalize">fecha inicio</h5>
              <div className="d-flex justify-content-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                />
              </div>
            </div>
            <div className="container mt-5">
              <h5 className="text-center mb-3 text-capitalize">fecha fin</h5>
              <div className="d-flex justify-content-center">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                />
              </div>
            </div>
            <h3>progress:</h3>
            <h3>users</h3>
            <h3>responsable</h3>
          </article>
          <article>
            <h3>dropdown</h3>
          </article>
        </section>
        <section className="d-flex justify-content-between">
          <article>
            <h3>tabla excel</h3>
          </article>
          <article className="d-flex flex-column">
            <h3>grafica pastel</h3>
            <h3>grafica lineal</h3>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
