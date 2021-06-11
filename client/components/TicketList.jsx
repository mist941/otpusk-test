import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import {getFlights} from "../api/sdk";
import {useSelector} from "react-redux";
import {selectUser} from "../store/auth";
import {TicketItem} from "./TicketItem";

export const TicketList = ({}) => {
  const currentUser = useSelector(selectUser);
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearch] = useState('');

  const sortByDate = tickets => {
    return tickets.sort((a, b) => {
      const aDate = a.date.split('-');
      const bDate = b.date.split('-');
      return new Date(bDate[2], bDate[1], bDate[0]) - new Date(aDate[2], aDate[1], aDate[0])
    })
  };

  const customFilter = value => {
    const filteredTickets = tickets.filter(ticket => {
      if (ticket.company.name.indexOf(value) > -1) return true;
      return !!ticket.company.alternativeNames.find(aName => aName.indexOf(value) > -1);
    });
    return filteredTickets;
  }

  useEffect(() => {
    getFlights(currentUser.token)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(data => {
        let preparedTicketArray = [];
        for (let key in data.data) {
          preparedTicketArray.push(data.data[key]);
        }
        setTickets(sortByDate(preparedTicketArray));
      });

  }, []);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Form.Control
            className="search"
            type="text"
            placeholder="Type for Search"
            onChange={(event => setSearch(event.currentTarget.value))}
          />
        </Col>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Company Name</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            customFilter(searchText).map(ticket => <TicketItem
              key={`key-${ticket.date}`}
              date={ticket.date}
              name={ticket.company.name}/>)
          }
          </tbody>
        </Table>
      </Row>
    </Container>
  )
};