import { useEffect, useState } from "react";
import "./ContactsList.css";
import {
    Avatar,
    Button,
    Card,
    FloatButton,
    Pagination,
    Popconfirm,
    Switch,
    Table,
    notification,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Modal from "antd/es/modal/Modal";
import AddContactForm from "../AddContactForm/AddContactForm";
import Column from "antd/es/table/Column";

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [openPopup, setOpenPopup] = useState(false);
    const [contactToEdit, setContactToEdit] = useState({});
    const [apiSuccess, setApiSuccess] = useState(false);
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [tableView, setTableView] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const getContactList = async () => {
        try {
            const contactsResponse = await fetch(
                `https://jsonplaceholder.typicode.com/users?page=${activePage}`
            );
            const contactsData = await contactsResponse.json();

            if (contactsResponse.ok) {
                setContacts(contactsData);
                setApiSuccess(true);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const onEditContact = (contact) => {
        if (contact) {
            setContactToEdit(contact);
        } else {
            setContactToEdit({});
        }
        setOpenPopup(!openPopup);
    };
    const chnagePageNumber = (page) => {
        setActivePage(page);
    };
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
        setFilteredInfo(filters);
    };

    const onDeleteContact = async (id) => {
        try {
            const deleteResponse = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (deleteResponse.ok) {
                api.info({
                    message: "Deleted",
                    description: "Contact deleted, But its a fake API :)",
                });
                setContacts(
                    contacts.filter((eachContact) => eachContact.id !== id)
                );
            } else {
                api.info({
                    message: "Failed",
                    description: "Failed to Deleted",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getContactList();
    }, [activePage]);

    return (
        <div className="list-parent-container">
            <span className="switch-tab">
                Table View :{" "}
                <Switch
                    checked={tableView}
                    onChange={() => setTableView(!tableView)}
                />
            </span>
            {contextHolder}
            <div className="contact-list-container">
                {contacts.length > 0 ? (
                    tableView ? (
                        <div className="table-container">
                            {" "}
                            <Table
                                className="contacts-table"
                                dataSource={contacts}
                                onChange={handleChange}
                                filteredInfo={filteredInfo}
                                pagination={false}
                            >
                                <Column
                                    style={{ fontWeight: "bold" }}
                                    title="Name"
                                    key="name"
                                    render={(record) => (
                                        <span style={{ fontWeight: "bold" }}>
                                            {record.name}
                                        </span>
                                    )}
                                    sorter={(a, b) =>
                                        a.name.localeCompare(b.name)
                                    }
                                    sortOrder={
                                        sortedInfo.columnKey === "name" &&
                                        sortedInfo.order
                                    }
                                />
                                <Column
                                    title="Mobile Number"
                                    dataIndex="phone"
                                    key="phone"
                                    sorter={(a, b) =>
                                        a.phone.localeCompare(b.phone)
                                    }
                                    sortOrder={
                                        sortedInfo.columnKey === "phone" &&
                                        sortedInfo.order
                                    }
                                />
                                <Column
                                    title="Email"
                                    dataIndex="email"
                                    key="email"
                                    sorter={(a, b) =>
                                        a.email.localeCompare(b.email)
                                    }
                                    sortOrder={
                                        sortedInfo.columnKey === "email" &&
                                        sortedInfo.order
                                    }
                                />
                                <Column
                                    title="Edit"
                                    key="action"
                                    render={(_, record) => (
                                        <EditOutlined
                                            onClick={() =>
                                                onEditContact(record)
                                            }
                                            key="edit"
                                            style={{ marginLeft: 8 }}
                                        />
                                    )}
                                />
                                <Column
                                    title="Delete"
                                    key="action"
                                    render={(_, record) => (
                                        <Popconfirm
                                            title="Delete Contact"
                                            description="Are You Sure Want To Delete"
                                            onConfirm={() =>
                                                onDeleteContact(record.id)
                                            }
                                            onCancel={null}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined
                                                style={{ marginLeft: 8 }}
                                            />
                                        </Popconfirm>
                                    )}
                                />
                            </Table>
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <Card
                                className="contact-card"
                                loading={!apiSuccess}
                            >
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                contact.profileImage
                                                    ? contact.profileImage
                                                    : "https://res.cloudinary.com/debxyw0pk/image/upload/v1707161831/th_20_kaqdlf.jpg"
                                            }
                                            alt="profile"
                                        />
                                    }
                                    title={
                                        <div className="edit-button-container">
                                            {contact.name}
                                            <Popconfirm
                                                title="Delete Contact"
                                                description="Are You Sure Want To Delete"
                                                onConfirm={() =>
                                                    onDeleteContact(contact.id)
                                                }
                                                onCancel={null}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined
                                                    style={{ marginLeft: 8 }}
                                                />
                                            </Popconfirm>
                                        </div>
                                    }
                                    description={
                                        <div className="edit-button-container">
                                            <div className="card-details">
                                                <p>
                                                    <span>Email : </span>
                                                    {contact.email}
                                                </p>
                                                <p>
                                                    <span>Mobile : </span>{" "}
                                                    {contact.phone}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    onEditContact(contact)
                                                }
                                                icon={
                                                    <EditOutlined
                                                        key="edit"
                                                        style={{
                                                            marginLeft: 8,
                                                        }}
                                                    />
                                                }
                                            />
                                        </div>
                                    }
                                />
                            </Card>
                        ))
                    )
                ) : (
                    <p>No Data Found</p>
                )}
            </div>
            {contacts.length > 0 && (
                <Pagination
                    className="pagination"
                    current={activePage}
                    onChange={chnagePageNumber}
                    defaultCurrent={1}
                    total={30}
                    pageSize={10}
                />
            )}

            <Modal
                title="Contact"
                footer={null}
                open={openPopup}
                onOk={null}
                onCancel={onEditContact}
                okButtonProps={{
                    disabled: true,
                }}
                cancelButtonProps={{
                    disabled: true,
                }}
            >
                <AddContactForm
                    contact={contactToEdit}
                    closePopup={onEditContact}
                />
            </Modal>
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={onEditContact}
            />
        </div>
    );
};

export default ContactsList;
