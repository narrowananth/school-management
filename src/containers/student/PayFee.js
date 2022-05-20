import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { request } from "../../utils";

export default function PayFee() {
  let [studentDetails, setStudentDetails] = useState({});
  let [history, setHistory] = useState([]);
  let [isHistoryPage, setHistoryPage] = useState(false);
  let [amount, setAmount] = useState("");
  let student = window.localStorage.getItem("user");
  let { standard, studentId } = JSON.parse(student);
  useEffect(() => {
    request(
      `https://school-management-prod.herokuapp.com/showStudentFees?standard=${standard}&studentId=${studentId}`,
    ).then((res) => {
      //   console.log(res);
      setStudentDetails(res.data[0]);
    });
  }, [studentId]);

  useEffect(() => {
    request(
      `https://school-management-prod.herokuapp.com/showStudentFeesHistory?standard=${standard}&studentId=${studentId}`,
    ).then((res) => {
      //   console.log(res);
      setHistory(res.data);
    });
  }, [isHistoryPage]);

  let handleAmountChange = (event) => {
    let val = event.target.value;
    setAmount(val);
  };

  let {
    advanceAmount = "",
    bookFees = "",
    examFees = "",
    yearlyFees = "",
    totalFees = "",
  } = studentDetails;

  let handlePayment = () => {
    request(
      `https://school-management-prod.herokuapp.com/studentPayment`,
      "POST",
      Object.assign({}, studentDetails, {
        totalFees: totalFees - amount,
        remaingFees: totalFees - amount,
      }),
    ).then((res) => {
      //   console.log(res);
      request(
        `https://school-management-prod.herokuapp.com/showStudentFees?standard=${standard}&studentId=${studentId}`,
      ).then((res) => {
        // console.log(res);
        setStudentDetails(res.data[0]);
      });
    });
  };

  //   console.log(history, "history");

  if (!isHistoryPage) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "500px",
            p: "20px",
            boxShadow: "0 1px 5px 0 grey",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            Student Fee Payment
          </Typography>
          <Divider></Divider>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {`Advance Amount: ${advanceAmount}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {`Book Fee: ${bookFees}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {`Exam Fee: ${examFees}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {`Yearly Fee: ${yearlyFees}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {`Total Fee: ${totalFees}`}
            </Typography>
          </Box>
          <TextField
            label="Amount to be paid"
            onChange={handleAmountChange}
            value={amount}
          ></TextField>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
            <Button variant="contained" onClick={handlePayment}>
              Pay Now
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setHistoryPage(true);
              }}
            >
              Payment History
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
          p: "20px",
          boxShadow: "0 1px 5px 0 grey",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Payment History
        </Typography>
        <Divider></Divider>
        <Box>
          {history.map(({ remaingFees, totalFees }) => {
            return (
              <>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {`Total Fee: ${totalFees}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {`Remaining Fee: ${remaingFees}`}
                  </Typography>
                </Box>
                <Divider></Divider>
              </>
            );
          })}
          <Button
            variant="contained"
            onClick={() => {
              setHistoryPage(false);
            }}
          >
            Back to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
