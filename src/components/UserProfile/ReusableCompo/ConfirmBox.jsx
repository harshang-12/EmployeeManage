import React, { forwardRef } from 'react'
import {   Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Typography } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

function ConfirmBox({ open, closeDialog , deleteFunction }) {
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                maxWidth="xs"
                scroll='body'
                onClose={closeDialog}
                onBackdropClick={closeDialog}
                TransitionComponent={Transition}
            >
                <DialogContent sx={{ px: 4, py: 4, position: "relative" }}>
                    <IconButton size="large" onClick={closeDialog} sx={{ position: "absolute", right: "2rem", top: "2rem", width: "40px", height: "40px", color: "black" }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>

                                <Typography variant='h4' sx={{ fontWeight: "bold", borderBottom: '1px solid #000' }}>
                                    Delete Confirmation
                                </Typography>
                                <div style={{ borderBottom: '1px solid #000' }}>

                                    <Typography variant='body1' sx={{
                                        display: "flex",
                                        justifyContent: "start",
                                        color: "red",
                                        marginTop: "15px",
                                        paddingTop: "15px",
                                        paddingLeft: "10px",
                                        paddingBottom: "15px",
                                        marginBottom: "15px"
                                    }}>
                                        Are You Sure You Want to Delete ?
                                    </Typography>
                                </div>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-35px", gap: '1rem' }}>


                            <Button onClick={closeDialog} size='medium' variant='outlined' color='secondary'>
                                Cancel
                            </Button>
                            <Button onClick={deleteFunction} size='medium' variant='contained' color='error'>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default ConfirmBox
