import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import { genericFetch } from "@request/dashboard";
import useSWR from "swr";
import AppointmentActions from "@components/calendar/AppointmentActions";
import { Spinner } from "reactstrap";
import AppointmenModalDelete from "@components/calendar/AppointmenModalDelete";

const url = `${process.env.baseUrl}/wp-json/appointment/v1/appointment?all`;

function AppointmentsList() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const debounceTerm = useDebounce(search, 500);

  const limit = 20;
  const [page, setPage] = useState(1);

  const { data: appointments, error, mutate } = useSWR(
    token
      ? [
          `${url}&length=${limit}&start=${
            (page - 1) * limit
          }&search=${debounceTerm}&count=true`,
          token,
        ]
      : null,
    genericFetch
  );

  const isLoading = !error && !appointments;
  
  const mutateAppointment = async (id) => {
      const newAppointments = appointments.filter(a => a.id !== id)
      await mutate(newAppointments)
  }

  return (
    <div className="container">
      <div className="d-flex  justify-content-between flex-column flex-md-row">
        <div>
          <h2 className="list-nav-item-title pl-0">Appointments List</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="table custom-table mt-5">
        <thead>
          <tr>
            <th scope="col">Appointment</th>
            <th scope="col">Product</th>
            <th scope="col">Order</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments &&
            appointments.map((appointment) => (
              <tr key={appointment.id} className={"custom-table"}>
                <td data-label="Appointment" scope="row">
                  {appointment.id} by {appointment.customer_name}
                </td>
                <td data-label="Product">{appointment.product_title}</td>
                <td data-label="Order">
                  {appointment.order_id} - {appointment.status}
                </td>
                <td data-label="Start Date">{appointment.start_date}</td>
                <td data-label="End Date">{appointment.end_date}</td>
                <td
                  data-label="Actions"
                  className={"d-md-flex justify-content-md-center"}
                >
                  <AppointmentActions
                    appointment={appointment.id}
                    openDeleteModal={open}
                    setOpenDeleteModal={setOpen}
                  />
                </td>
                <AppointmenModalDelete
                    setOpen={setOpen}
                    open={open}
                    mutate={mutateAppointment}
                    appointment={appointment} />
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading ? (
        <div className={"d-flex justify-content-center p-5"}>
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : null}
    </div>
  );
}

export default AppointmentsList;
