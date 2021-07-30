import React, {useState, useEffect} from 'react';
import '../../App.css';
//import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Button} from 'react-bootstrap';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
   
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));



function Users()  {

  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false)
    console.log('cevaaaa handle close')
    console.log(show)
  }

 const handleShow = () => { setShow(true)
    console.log('cevaaaa handle show')
    console.log(show)
 }

const toggleTrueFalse = () => {
setShowModal(handleShow);
};

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect( () => {
    axios
        .get('http://92.87.91.43:4000/users')
        .then( res => {
          console.log(res)
          setUserData(res.data)
        })
        .catch( err => {
          alert(err)
        })
  }, []);


  return (
    <div className='Users'>
      <br /> <br/>
      <h1 style={{color: '#fff', textAlign: 'center'}}>Users </h1>
      <br/><br/>

<TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
      <TableBody>
      {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow 
                key={row.email} 
                onClick = { toggleTrueFalse}
            >
              {show ? <Modal show={show} onHiden={handleClose} >
<Modal.Header >
  <Modal.Title > {row.email} </Modal.Title>
    </Modal.Header>
      <Modal.Body >
        <h2>Status</h2>
        <ul>
          <ol>Role: {row.role}</ol>
          <ol>Exp_data: {row.exp_data}</ol>
          <ol>Mat_number: {row.mat_number}</ol>
          <ol>Reserved: {row.reserved}</ol>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>  : null }
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.email} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.email}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>

              
            </TableRow>

      ))}
      
        </TableBody>

        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>

      </Table>
    </TableContainer>

    </div>
  );
}              
          
export default Users;