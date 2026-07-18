"use client"
import { socketService } from "@/shared/lib/websocket/socket"
import { useEffect } from "react"

export default function Chat() {
    useEffect(() => {
        const a = socketService;
        a.connect("http://localhost:8080/ws")
    }, [])
    return (<></>)
}