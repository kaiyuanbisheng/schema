import { Row, Col } from "antd";
import moment from "moment";
import React, { FC, useEffect, useRef, useState } from 'react'
import './listItem.css';
interface Props {
    showData: any
}
const ListItem: FC<Props> = ({ showData }) => {
    const hetmel = document.documentElement
    useEffect(() => {
        window.addEventListener('resize', () => {
            const htmlFontSize = hetmel.clientWidth / 100
            hetmel.style.fontSize = htmlFontSize + 'px'

        })
        return () => {
            window.removeEventListener('resize', () => {
                const htmlFontSize = hetmel.clientWidth / 100
                hetmel.style.fontSize = htmlFontSize + 'px'
            })
        }
    }, [])

    return (
        <Row className='itemList'>
            <Col className='left'>
                {showData.money} <span className='yuan'>元</span>
            </Col>
            <Col className='middle'>
                <p> {showData.title}</p>
                <p> {showData.description}</p>
                <p>{showData?.restTime ? <div>
                    距离结束时间  {GetTime(showData.time[0], showData.time[1])}
                </div> : <div>
                    有效期 :{moment(showData?.time[0]).format("MM.DD HH:MM")}-
                    {moment(showData?.time[1]).format("MM.DD HH:MM")}
                </div>}</p>
            </Col>
            <Col className='right'>
                {showData.status}
            </Col>
        </Row>
    )
}
export default ListItem
interface Time {
    leftd: number
    lefth: number
    leftm: number
    lefts: number
    timeInterva?: any
}
const GetTime = (sartTime: number, endtime: number) => {
    const timeRef = useRef<Time>()
    const [time, setTime] = useState<number>()
    const newSartTime = new Date(moment(sartTime).format("YYYY-MM-DD HH:MM:SS"))
    const newEndtime = new Date(moment(endtime).format("YYYY-MM-DD HH:MM:SS"))
    const lefttime = newEndtime.getTime() - newSartTime.getTime()  //距离结束时间的毫秒数
    const countDown = () => {
        setTime((e) => {
            if (e) {
                return e - 1000
            }
            return lefttime - 100
        })
    }
    useEffect(() => {
        timeRef.current = {
            leftd: Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
            lefth: Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
            leftm: Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
            lefts: Math.floor(lefttime / 1000 % 60),  //计算秒数
            timeInterva: setInterval(() => {
                countDown()
            }, 1000)
        }
       return () =>{
        clearInterval(timeRef.current?.timeInterva)

       }
    }, [])

    useEffect(() => {
        if (time) {
            timeRef.current = {
                leftd: Math.floor(time / (1000 * 60 * 60 * 24)),  //计算天数
                lefth: Math.floor(time / (1000 * 60 * 60) % 24),  //计算小时数
                leftm: Math.floor(time / (1000 * 60) % 60),  //计算分钟数
                lefts: Math.floor(time / 1000 % 60),  //计算秒数
            }
        }
        if(time===0){
            clearInterval(timeRef.current?.timeInterva)
        }
       
    }, [time])


    return <span>
        <span className={"countDown leftd"}>{timeRef?.current?.leftd}</span>
        <span className="countDown lefth">{timeRef?.current?.lefth}</span>
        <span className="countDown leftm">{timeRef?.current?.leftm}</span>
        <span className="countDown lefts">{timeRef?.current?.lefts}</span>
    </span>

}