import React from "react"

export interface AdminProps {
    children: React.ReactNode;
    pageName: React.ReactNode
}

export interface HeaderProps {
    pageName: React.ReactNode
}

export interface MastersType {
    "id": string
    "firstName": string
    "lastName": string
    "phoneNumber": string
    "password": null | string,
    "role": string
    "userStatus": string
}

export interface StadiumsType{
    "id": string
    "name": string
    "number": number
    "lat": number
    "lang": number
    "price": number
    "initialPay": number
    "length": number
    "width": number
    "description": string
    "startHour": number
    "startMinute": number
    "endHour": number
    "endMinute": number
    "attechmentIds": [
      string,
      string,
      string,
      string
    ],
    "isMainAttachmentId": null | string
    "shower": boolean
    "shopping": boolean
    "toilet": boolean
    "favourite": boolean
}