import { io } from "socket.io-client"
import { serverUrl } from "./App"

const socket = io(serverUrl, { withCredentials: true })

export default socket
