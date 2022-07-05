import React, { useEffect, useState } from "react";
import { Col, List } from "antd";
import { useAllNotificationsQuery } from "api/notification";
import { use } from "i18next";

const ListNotifications = () => {
    const { isLoading, isSuccess, data } = useAllNotificationsQuery();

    const [notifications, setNotifications] = useState();
    //const [selectedNotificationIds, setSelectedNotificationIds] = useState(new Set());


    //== icons ==
    const goldenStarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M21.7759 7.94393C21.7078 7.74337 21.5825 7.56714 21.4154 7.437C21.2483 7.30685 21.0467 7.2285 20.8356 7.2116L14.6595 6.72085L11.9869 0.804766C11.9018 0.614221 11.7633 0.452381 11.5883 0.338778C11.4132 0.225175 11.209 0.164665 11.0003 0.164551C10.7916 0.164436 10.5874 0.224722 10.4122 0.338133C10.237 0.451543 10.0984 0.613231 10.0131 0.803682L7.34049 6.72085L1.1644 7.2116C0.956898 7.22804 0.758521 7.30391 0.593006 7.43014C0.427491 7.55637 0.301847 7.72761 0.231105 7.92338C0.160364 8.11915 0.14752 8.33115 0.194111 8.53403C0.240703 8.7369 0.344755 8.92206 0.493821 9.06735L5.0579 13.5166L3.44374 20.5063C3.39472 20.7178 3.41043 20.9393 3.48883 21.1418C3.56722 21.3443 3.70467 21.5186 3.88336 21.6421C4.06204 21.7655 4.2737 21.8324 4.49087 21.8341C4.70804 21.8357 4.92069 21.7721 5.10124 21.6514L11 17.7189L16.8987 21.6514C17.0833 21.7739 17.3009 21.8369 17.5223 21.8321C17.7438 21.8272 17.9584 21.7547 18.1374 21.6242C18.3164 21.4937 18.4511 21.3115 18.5235 21.1022C18.5958 20.8928 18.6024 20.6663 18.5422 20.4532L16.5607 13.5198L21.4747 9.09768C21.7965 8.80735 21.9146 8.35452 21.7759 7.94393Z" fill="#FFC700" />
    </svg>;
    const greyStarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
        <path d="M21.9441 8.31017L15.2494 7.33722L12.2567 1.27013C12.175 1.10401 12.0405 0.969541 11.8744 0.887803C11.4578 0.682139 10.9516 0.853525 10.7433 1.27013L7.7506 7.33722L1.05597 8.31017C0.871398 8.33653 0.702648 8.42354 0.573449 8.55538C0.417254 8.71592 0.331184 8.93191 0.33415 9.15587C0.337117 9.37984 0.428877 9.59347 0.589269 9.74981L5.43292 14.4722L4.28859 21.1404C4.26175 21.2956 4.27892 21.4551 4.33813 21.601C4.39735 21.7468 4.49626 21.8732 4.62363 21.9657C4.751 22.0582 4.90175 22.1131 5.05877 22.1243C5.21579 22.1355 5.37281 22.1025 5.51202 22.029L11.5 18.8808L17.488 22.029C17.6515 22.116 17.8413 22.145 18.0233 22.1134C18.482 22.0343 18.7905 21.5992 18.7114 21.1404L17.5671 14.4722L22.4108 9.74981C22.5426 9.62062 22.6296 9.45187 22.656 9.26729C22.7272 8.80587 22.4055 8.37872 21.9441 8.31017ZM15.5289 13.8077L16.4808 19.3527L11.5 16.7371L6.51925 19.3554L7.47111 13.8104L3.4422 9.88165L9.01095 9.07218L11.5 4.02813L13.9891 9.07218L19.5578 9.88165L15.5289 13.8077Z" fill="#D7D7D7" />
    </svg>;
    const tickIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path d="M1 4.21429L4.33357 7.42857L11 1" stroke="#004FBA" stroke-width="1.24568" stroke-linecap="round" stroke-linejoin="round" />
    </svg>;
    //== icons ==

    // const toggleSelectNotification = (notificationId) => {
    //     const selectedNotifications = new Set(selectedNotificationIds);
    //     if (selectedNotifications.has(notificationId)) {
    //         selectedNotifications.delete(notificationId)
    //     } else {
    //         selectedNotifications.add(notificationId);
    //     }
    //     setSelectedNotificationIds(selectedNotifications);
    // }

    const bookmarkNotification = (notificationId) => {
        const allNotifications = [...notifications];
        const notification = allNotifications.find(notification => notification.notificationId === notificationId);
        const isImportant = notification.isImportant;
        const allOtherNotifications = allNotifications.filter(notification => notification.notificationId != notificationId)
        const newNotifications = [...allOtherNotifications, {...notification, isImportant: !isImportant}]
        setNotifications(newNotifications);
    }

    useEffect(() => {
        if (data != undefined) {
            const notifs = data.data;
            setNotifications(notifs);
        }
    }, [data])

    return (
        <div id="notifications-list">
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item key={item.notificationId} style={{
                        //backgroundColor: selectedNotificationIds.has(item.notificationId) ? '#F9FBFC' : '#FFFFFF',
                        padding: '15px'
                    }}>
                        <div className="item-box">
                            <Col xs={2}>
                                <div className="checkbox-and-star">
                                    {/* <div
                                        className="checkbox"
                                        onClick={() => toggleSelectNotification(item.notificationId)}
                                    >
                                        {selectedNotificationIds.has(item.notificationId) ? tickIcon : null}
                                    </div> */}
                                    <div className="star" onClick={() => bookmarkNotification(item.notificationId)}>{item.isImportant ? goldenStarIcon : greyStarIcon}</div>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="data-column">
                                    <div className="sender">{item.sender}</div>
                                </div>
                            </Col>
                            <Col xs={5}>
                                <div className="data-column">
                                    <div className="subject">{item.subject}</div>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="data-column">
                                    <div className="description">{item.message}</div>
                                </div>
                            </Col>
                            <Col xs={5}>
                                <div className="data-column">
                                    <div className="date">{(new Date(item.date)).toLocaleString('en-US', {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</div>
                                </div>
                            </Col>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default ListNotifications;