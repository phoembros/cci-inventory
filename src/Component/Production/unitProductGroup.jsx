import * as React from "react";
import { GET_UNIT_BYID } from "../../Schema/unit";
import { useQuery } from "@apollo/client";

export default function UnitProductGroup({rows}) {

    console.log(rows);

    const { data , refetch } = useQuery(GET_UNIT_BYID,{
        variables: {
            unitId: rows?.productGroupId?.unit?._id,
        },
        onCompleted: ({getUnitById}) => {
            console.log(getUnitById)
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    return data?.getUnitById
}