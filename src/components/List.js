import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import AddItem from './AddItem';
import EditItem from './EditItem';
import './style.css'

function List() {
    const [certificateList, setCertificateList] = useState([])
    const [showAddModal, setshowAddModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState({})
    const [selectedCertificateIndex, setSelectedCertificateIndex] = useState('')
    // console.log('certificate',certificateList);

    //Add Certificate
    let updateShowAddModal = () => {
        // console.log('update add modal');
        setshowAddModal(true)
    }
    let hideShowAddModal = () => {
        setshowAddModal(false);
    };

    let updateCertificateList = (certificate) => {
        //   console.log(certificate);
        let certificateCopy = [...certificateList]
        certificateCopy.push(certificate)
        setCertificateList(certificateCopy)
        alert("Certificate Added Successfully!!")
    }

    //Edit Certificate
    let updateCertificateAfterEdit = async (certificate) => {
        let certificateCopy = [...certificateList]
        certificateCopy.splice(selectedCertificateIndex, 1, certificate)
        setCertificateList(certificateCopy)
        setSelectedCertificateIndex('')
        setshowEditModal(false)
        alert("Certificate Changes Updated Successfully!!")
    }
    let updateShowEditModal = (certificate, index) => {
        setshowEditModal(true)
        // console.log(index);
        setSelectedCertificateIndex(index)
        setSelectedCertificate(certificate)
    }
    let hideShowEditModal = () => {
        setshowEditModal(false)
    }

    let deleteCertificate = (index) => {
        if (window.confirm('Are you sure to Delete this Certificate?')) {
            let certificateCopy = [...certificateList]
            certificateCopy.splice(index, 1)
            setCertificateList(certificateCopy)
        }
    }


    return (
        <div>
            <Table striped hover>
                <thead className='border-bottom'>
                    <tr>
                        <th>Id</th>
                        <th>Certification Name</th>
                        <th>Certified From</th>
                        <th>Year Of Completion</th>
                        <th><button className="add-bn border border-3" onClick={updateShowAddModal}>Add</button></th>
                    </tr>
                </thead>
                <tbody>
                    {certificateList.length > 0 ? certificateList.map((person, idx) => {
                        return <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{person.certificateName}</td>
                            <td>{person.certifiedBy}</td>
                            <td>{person.yearOfCompletion}</td>
                            <td><i class="bi bi-pencil-square me-3" onClick={() => updateShowEditModal(person, idx)}></i>
                                <i class="bi bi-trash" onClick={() => deleteCertificate(idx)}></i></td>
                        </tr>
                    })
                        : <tr>
                            <td></td>
                            <td></td>
                            <td className="emptyList">No Certification Done</td>
                            <td></td>
                            <td></td></tr>}


                </tbody>
            </Table>

            <AddItem showAddModal={showAddModal}
                hideShowAddModal={hideShowAddModal}
                updateCertificateList={updateCertificateList}
            />

            <EditItem showEditModal={showEditModal}
                hideShowEditModal={hideShowEditModal}
                updateCertificateAfterEdit={updateCertificateAfterEdit}
                selectedCertificate={selectedCertificate}
            />
        </div>
    )
}

export default List
