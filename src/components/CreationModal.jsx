import { createRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export function CreateModal(props){
    const {modal,toggle,buttonLabel,header,form} = props
    

    return(
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>{header}</ModalHeader>
                <ModalBody>
                   {form}
                </ModalBody>
        </Modal>
    )
}