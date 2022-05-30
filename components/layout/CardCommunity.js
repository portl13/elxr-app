import styled from "@emotion/styled";
import { Col } from "reactstrap";
import Link from 'next/link';

const DivMemberCardStyle = styled.div`

overflow:hidden;
padding:.2rem;
margin-bottom:1rem;
.bs-group-cover {
    overflow: hidden;
    margin: -15px -20px 5px;
    position: relative;
}

.bs-group-cover a {
    border-radius: 3px 3px 0 0;
    position: relative;
    overflow: hidden;
    padding-top: 52.56%;
    display: block;
    background: #809ab4;
}

.item-avatar{
		margin-bottom: 20px;
    text-align: left;
    display: flex;
		position:relative;
    align-items: flex-end;
    justify-content: space-between;
}

.group-avatar-wrap{
		margin-top: -47px;
		min-height: 81px;
		min-width:81px;
		display:inline-block;
		background: #eee;
		border: 3px solid #fff;
		box-shadow: 0 2px 5px 0 rgba(18,43,70,.12), 0 0 0 1px #e7e9ec;
    border-radius: 3px;
}

.list-title{
	.banned-text{
		color:red;
	}
margin-bottom:10px;
text-align: left;
line-height: 1.1;
	a{
		color: #eee;
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -.24px;
    line-height: 1.2;
	}
	.banned-text{
		color:red;
	}
}



.avatar{
	max-width: 75px;
	width: 100%;
	border-radius: 3px;
	height: auto;
  display: block;
}


.bs-group-cover a:before {
    background: rgba(0,0,0,.25);
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.bs-group-cover img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 0;
    min-height: 100%;
    width: auto;
    min-width: 100%;
    object-fit: cover;
}

.group-members-wrap.only-grid-view {
    font-size: 12px;
    color: #a3a5a9;
    letter-spacing: -.24px;
    margin-bottom: 2px;
    text-align: left;
}

.bs-group-members img:nth-of-type(2) {
    z-index: 2;
}
.bs-group-members img {
    border: 1px solid #fff;
    max-width: 24px;
    display: inline-block;
    margin-right: -8px;
    position: relative;
    z-index: 3;
}
.entry-content img {
    vertical-align: bottom;
}
.round {
    border-radius: 50%;
}

.item-meta{
font-size:13px;
font-weight:14px;
}

.list-wrap{
	position:relative
	}
`


function CardCommunity({ community }) {

	const {
		name = "",
		cover_url = null,
		avatar_urls: {
			thumb = null
		},
		types = null,
		status = "",
		members_count = 0,
		id,
		slug
	} = community;


	return (
		<Col xs="12" md="6" lg="4">
			<DivMemberCardStyle >
				<div className="list-wrap" >
					<div className="bs-group-cover only-grid-view">
						<Link href={`/community/${slug}/${id}`}>
							<a >
								<img src={cover_url} />
							</a>
						</Link>
					</div>
					<div className="item-avatar">
						<a className="group-avatar-wrap">
							<img className="avatar" src={thumb} />
						</a>
					</div>
					<div className="item">
						<div className="item-block">
							<h2 className="list-title groups-title">
								<Link href={`/community/${slug}/${id}`}>
									<a>{name}</a>
								</Link>
							</h2>
						</div>
						<p className="item-meta group-details only-grid-view">
							<span className="group-visibility public">{status}</span>
							{types.length !== 0 && <span className="type-separator">/</span>}
							{types.length !== 0 && <span className="group-type">{types[0]}</span>}

						</p>
					</div>
					<div className="group-members-wrap only-grid-view">
						<span className="members">
							<span className="members-count-g">{members_count}</span> members
						</span>
					</div>
				</div>
			</DivMemberCardStyle>
		</Col>
	);
}


export default CardCommunity;
