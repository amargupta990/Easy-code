class ApiResponse{
    constructor(statuscode,data,messege="success",token){
            this.statuscode=statuscode
            this.data=data
            this.messege=messege
            this.token =token
            this.success=statuscode<400
    }
}
export default ApiResponse
