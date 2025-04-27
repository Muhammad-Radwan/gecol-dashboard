export function  IsDoneToString(isDone:number) {
    let state: string = "hello"

    switch(isDone){
        case 0:
            state = "لم يتم التسوية"
            break;
        case 1:
            state = "تم التسوية"
            break;
        default:
            state = "غير معروف"
    }

    return state
}