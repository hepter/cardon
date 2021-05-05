
import { withCardon } from "cardon";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React from "react";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



export default withCardon(function ModarCard({ title, visible, get }) {
    const classes = useStyles();

    return (
        <Modal
            open={visible}
            onClose={get()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div
                style={{
                    top: "20%",
                    left: "38%"
                }}
                className={classes.paper}
            >
                <h2 id="simple-modal-title">{title}</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
            </div>
        </Modal>
    )

})