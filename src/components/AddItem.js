import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useCallback, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './style.css'

function AddItem({ showAddModal, hideShowAddModal, updateCertificateList }) {
    //Validation by Formik
    // let initialValues = {
    //     Name: '',
    //     Certified_By: '',
    //     YOC: '',
    // }
    // let validationSchema = yup.object().shape({
    //     Name: yup.string().max(15).required("CertificationName is required"),
    //     Certified_By: yup.string().required("Certified From is required"),
    //     YOC: yup.number().required("Year Of Completion is required").max(4),
    // })

    const [certificate, setCertificate] = useState({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''
    });
    const [errors, setErrors] = useState({
        NameError: '',
        CertifiedByError: '',
        YOCError: '',
    })

    const validateName = useCallback(
        () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        NameError: 'Certification-Name should have minimum of 5 characters'
                    })
                }
                else{return true}
                
            }
            else {
                setErrors({
                    NameError: 'Certification-Name Required'
                })
                return false;
            }
        },
        [certificate.certificateName],
    )
    const validateCertifiedBy = () => {
        if (certificate.certifiedBy) {
            if (certificate.certifiedBy.length < 5) {
                setErrors({
                    CertifiedByError: 'Certifed From should have minimum of 5 characters'
                })
            }
            else{return true}
        }
        else {
            setErrors({
                CertifiedByError: 'Certified From Required'
            })
        }
    }
    const validateYOC = () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2022)) {
                setErrors({
                    YOCError: 'Year of Completion must be within 1951-2022'
                })
                return false;
            }
            else{return true}
        }
        else {
            setErrors({
                YOCError: 'Year Of Completion Required'
            })
            return false;
        }
    }

    let handleClose = () => {
        hideShowAddModal()
    }

    let handleChange = (event) => {
        // console.log(event.target.value);
        setCertificate({
            ...certificate,
            [event.target.name]: event.target.value
        })
    }

    let addCertificate = () => {
        // console.log('inside add',certificate);
        validateName();
        validateCertifiedBy();
        validateYOC();
        if (validateName() && validateCertifiedBy() && validateYOC()) {
            updateCertificateList(certificate)
            setCertificate({
                certificateName: '',
                certifiedBy: '',
                yearOfCompletion: ''
            })
            setErrors({
                NameError: '',
                CertifiedByError: '',
                YOCError: '',
            })
        }
    }

    return (
        <div>
            <Modal className="rounded-start" show={showAddModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Add Certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                    // initialValues={initialValues}
                    // validationSchema={validationSchema}
                    // onSubmit={addCertificate}
                    >
                        {(props) => (
                            <Form>
                                <div>
                                    <label>Certification Name</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certificateName"
                                        placeholder='Enter Certificate Name'
                                        value={certificate.certificateName}
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                    {errors.NameError && <div className='errMsg'>{errors.NameError}</div>}
                                    <p className='error'><ErrorMessage name="Name" /></p>
                                </div>
                                <div>
                                    <label>Certification From</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certifiedBy"
                                        autoComplete='off'
                                        placeholder='Enter Certified From'
                                        value={certificate.certifiedBy}
                                        onChange={handleChange}
                                    />
                                    {errors.CertifiedByError && <div className='errMsg'>{errors.CertifiedByError}</div>}
                                    <p className='error'><ErrorMessage name="Certified_By" /></p>
                                </div>
                                <div>
                                    <label>Year Of Completition</label>
                                    <Field
                                        type="number"
                                        className="form-control mb-2"
                                        name="yearOfCompletion"
                                        autoComplete='off'
                                        placeholder='Enter Year Of Completion'
                                        value={certificate.yearOfCompletion}
                                        onChange={handleChange}
                                    />
                                    {errors.YOCError && <div className='errMsg'>{errors.YOCError}</div>}
                                    <p className='error'><ErrorMessage name="YOC" /></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={addCertificate} >
                        Add Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddItem
