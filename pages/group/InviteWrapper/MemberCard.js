
import React from "react"
import { Button } from "reactstrap"

export default function MemberCard({ member, parentMember, memberId }) {

    const checkStatus = (ele) => memberId && memberId.indexOf(ele.id) !== -1;
    const status = (ele) => {
        if (!checkStatus(ele)) {
            parentMember(ele.id, ele.profile_name, true)
        } else {
            parentMember(ele.id, ele.profile_name, false)
        }
    }

    return (
        <>
            <div className="members-list-panel">
                <ul>
                    <li>
                        <div className="item-avatar">
                            <img src={member?.avatar_urls.thumb} />
                        </div>
                        <div className="list-title">
                            <span>{member?.profile_name}</span>
                            <Button onClick={() => status(member)}>{!checkStatus(member)
                                ? "invite+" : "Cancel invite"}</Button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
