import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setChanged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //   navigate('/404');
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, []);

  function deleteCustomer(e) {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        navigate('/customers');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function updateCustomer() {
    const url = baseUrl + 'api/customers/' + id + '/';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
      })
      .catch(() => {
        console.log();
      });
  }

  return (
    <>
      {notFound ? <p>The customer with id {id} was not found.</p> : null}
      {customer ? (
        <div>
          <p className="m-2 block px-2" type="text">
            ID: {tempCustomer.id}
          </p>
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, name: e.target.value });
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />
          {changed ? (
            <>
              <button
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateCustomer}>Save</button>
            </>
          ) : null}
        </div>
      ) : null}
      <button onClick={deleteCustomer}>Delete Customer</button>
      <br />
      <Link to="/customers">Go Back</Link>
    </>
  );
}
