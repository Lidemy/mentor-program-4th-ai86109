function search(arr, n){
    if(arr[0] > n || arr[arr.length -1] < n){
        return -1
    }else{
        let H = 0
        let T = arr.length-1
        if(arr[H] === n){
            return H
        }else if(arr[T] === n){
            return T
        }
        while(T>=H){
            let M = Math.floor((H+T)/2)
            if(arr[M] === n){
                return M
            }else if(arr[M]>n){
                T = M-1
            }else{
                H = M+1
            }
        }
        return -1
    }
}

console.log(search([1, 3, 10, 14, 39], 299))