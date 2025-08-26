// src/components/ApplicationStatus/CouponDialog.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Inputbox from "../../../Widgets/Inputbox/Input_box";

const CouponDialog = ({ open, onClose, couponDetails, setCouponDetails, onApply }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle>Apply Coupon</DialogTitle>
      <DialogContent>
        <Inputbox
          label="Mobile Number"
          id="couponMobile"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={couponDetails.mobile}
          onChange={(e) => setCouponDetails({ ...couponDetails, mobile: e.target.value })}
        />
        <Inputbox
          label="Coupon Code"
          id="couponCode"
          name="code"
          placeholder="Enter Coupon Code"
          value={couponDetails.code}
          onChange={(e) => setCouponDetails({ ...couponDetails, code: e.target.value })}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0 24px 24px" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "0.95rem",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onApply}
          variant="contained"
          sx={{
            borderRadius: "12px",
            backgroundColor: "#3425FF",
            textTransform: "none",
            fontSize: "0.95rem",
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CouponDialog;