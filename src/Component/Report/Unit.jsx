import * as React from "react";
import {GET_UNIT_BYID} from "../../Schema/unit";
import { useQuery } from "@apollo/client";

export default function Unit({unitId}) {

    const { data , refetch } = useQuery(GET_UNIT_BYID,{
        variables: {
            unitId: unitId
        }
    })

    React.useEffect( () => {
        refetch()
    },[unitId])
    
    return data?.getUnitById;
}