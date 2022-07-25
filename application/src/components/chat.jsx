import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  Container, Row,
} from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import fetchData from '../thunks/dataFetchThunk';
import Channels from './channels';
import Messages from './messages';

function Chat() {
  const dispatch = useDispatch();
  const { getRequestHeader } = useAuth();
  const requestHeader = getRequestHeader();
  useEffect(() => {
    dispatch(fetchData(requestHeader));
  }, [dispatch, requestHeader]);

  return (
    <Container
      className="h-100 my-4 overflow-hidden rounded shadow"
    >
      <Row
        className="h-100 bg-white flex-md-row"
      >

        <Col
          xs={4}
          md={3}
          className="border-end pt-4 px-0 bg-light h-100"
        >

          <Channels />
        </Col>

        <Col
          className="col p-0 h-100"
        >

          <Messages />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
