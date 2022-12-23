# Žaidimų vertimo sistema
 
 ## **1. Sprendžiamo uždavinio aprašymas**
### 1.1 Sistemos paskirtis
Projekto tikslas – platforma, skirta apjungti daugiau autobusų parkų į paprastesnę naudoti autobusų tvarkaraščių sistemą.
Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis keleiviai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API). 
Keleivis, norėdamas naudotis šia platforma, prisiregistruos prie internetinės aplikacijos ir galės pasižymėti savo dažnas keliones greitesniam pasiekiamumui, užsisakyti bilietus pasirinktam maršrutui. Neprisijungę naudotojai hierarchiniu principu galės pasiekti bet kurį autobusų parką, kuris yra suvestas sistemoje. Administratorius bus atsakingas už visą suvedamą informaciją, kurią matys keleiviai bei bendrajai tvarkai : parko bendrinę informaciją – aikštelių skaičių, adresą, darbo laiką, kelią (maršrutą) – esamas stoteles, laiką, pažymėti vėluojančius, autobusus, kurie važiuoja kiekvienu keliu – valstybiniai numeriai, techninė apžiūra, kilo metražas, važiavimo laikas.

### 1.2 Funkciniai reikalavimai

Sistema sudarys trys sistemos naudotojai: administratorius, registruotas vartotojas, neregistruotas.

**Neregistruotas sistemos naudotojas galės:** 
1.	Peržiūrėti visų parkų sąrašą
2.	Peržiūrėti maršrutus
3.	Peržiūrėti laikus kuomet važiuoja
4.	Peržiūrėti maršruto stoteles žemėlapyje
5.	Prisijungti prie internetinės aplikacijos.


**Registruotas sistemos naudotojas galės:** 
1.	Atsijungti nuo internetinės aplikacijos; 
2.	Prisijungti (užsiregistruoti) prie platformos;
3.	Pasirinkti laikus įsiminti
4.	Nusipirkti bilietą į norimą kelionę


**Administratorius:**
1.	Šalinti naudotojus. 
2.	Pridėti,redaguoti, šalinti parkus, kelius, autobusus(laikus) 


## 2. Projekto pasirinktos technologijos
**Front-End:** React JS + TypeScript.
**Back-End:** Node.js + TypeScript.

## 3. Sistemos architectūra

![image](/Model.jpg)

# Wireframe ir galutinio produkto palyginimai
## Pagrindinis puslapis
![image](/Screenshots/MainWire.png)
![image](/Screenshots/MainReal.png)

## Krypčių sąrašas
![image](/Screenshots/ParkCardWire.png)
![image](/Screenshots/ParkCardReall.png)

## Autobusų sąrašas
![image](/Screenshots/BusListWire.png)

![image](/Screenshots/BusListReal.png)

![image](/Screenshots/BusListReal.png)
##  Prisijungimo langas
![image](/Screenshots/LoginWire.png)
![image](/Screenshots/LoginReal.png)

## Registracijos langas
![image](/Screenshots/RegisterWire.png)
![image](/Screenshots/RegisterReal.png)

# API Specifikacijos
## GET parks/list

**RESOURCES URL**
https://busparks.azurewebsites.net/api/parks/

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/parks/

### Result

```javascript
[
    {
        "Id": 1,
        "workHours": {
            "friday": "7:00 - 19:00",
            "monday": "7:00 - 19:00",
            "sunday": "8:00 - 19:00",
            "tuesday": "7:00 - 19:00",
            "saturday": "7:00 - 19:00",
            "thursday": "7:00 - 19:00",
            "wednesday": "7:00 - 19:00"
        },
        "City": "Vilkaviškis",
        "Street": "Vytauto g.",
        "Number": "103",
        "routesNumber": 8
    },
]
```
## GET parks/single

**RESOURCES URL**
GET https://busparks.azurewebsites.net/api/parks/:id/

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |

## EXAMPLE REQUEST

**SEND GET REQUEST** https://busparks.azurewebsites.net/api/parks/2/

### Result

```javascript
{
    "Id": 2,
    "workHours": {
        "friday": "7:00 - 19:00",
        "monday": "7:00 - 19:00",
        "sunday": "8:00 - 19:00",
        "tuesday": "7:00 - 19:00",
        "saturday": "7:00 - 19:00",
        "thursday": "7:00 - 19:00",
        "wednesday": "7:00 - 19:00"
    },
    "City": "Kaunas",
    "Street": "Vytauto pr.",
    "Number": "24",
    "routesNumber": 18
}
```

## DELETE parks/single

**RESOURCES URL**
DELETE https://busparks.azurewebsites.net/api/parks/:id/

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND DELETE REQUEST** https://busparks.azurewebsites.net/api/parks/1/

### Result
```javascript
    {
        "Id": 1,
        "workHours": {
            "friday": "7:00 - 19:00",
            "monday": "7:00 - 19:00",
            "sunday": "8:00 - 19:00",
            "tuesday": "7:00 - 19:00",
            "saturday": "7:00 - 19:00",
            "thursday": "7:00 - 19:00",
            "wednesday": "7:00 - 19:00"
        },
        "City": "Vilkaviškis",
        "Street": "Vytauto g.",
        "Number": "103",
        "routesNumber": 8
    }
```

## POST parks/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/parks/

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 201 | Created  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND POST REQUEST** https://busparks.azurewebsites.net/api/parks/

```javascript
{
    "workHours": {
                "friday": "7:00 - 19:00",
                "monday": "7:00 - 19:00",
                "sunday": "8:00 - 19:00",
                "tuesday": "7:00 - 19:00",
                "saturday": "7:00 - 19:00",
                "thursday": "7:00 - 19:00",
                "wednesday": "7:00 - 19:00"
            },
    "City" : "Marijampolė",
    "Street" : "Jazminų",
    "Number" : "22",
    "routesNumber" : 18
}
```
### Result
Give back what was given with 201
```javascript
{
    "workHours": {
        "friday": "7:00 - 19:00",
        "monday": "7:00 - 19:00",
        "sunday": "8:00 - 19:00",
        "tuesday": "7:00 - 19:00",
        "saturday": "7:00 - 19:00",
        "thursday": "7:00 - 19:00",
        "wednesday": "7:00 - 19:00"
    },
    "City": "Marijampolė",
    "Street": "Jazminų",
    "Number": "22",
    "routesNumber": 18
}
```

## PUT parks/single

**RESOURCES URL**
PUT https://busparks.azurewebsites.net/api/parks/:id

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND PUT REQUEST** https://busparks.azurewebsites.net/api/parks/2

```javascript
{
    "workHours": {
                "friday": "6:00 - 18:00",
                "monday": "6:00 - 18:00",
                "sunday": "6:00 - 17:00",
                "tuesday": "6:00 - 18:00",
                "saturday": "6:00 - 17:00",
                "thursday": "6:00 - 18:00",
                "wednesday": "6:00 - 18:00"
            },
    "City" : "Kaunas",
    "Street" : "Vytauto pr.",
    "Number" : "24",
    "routesNumber" : 50
}
```
### Result
```javascript
{
    "workHours": {
                "friday": "6:00 - 18:00",
                "monday": "6:00 - 18:00",
                "sunday": "6:00 - 17:00",
                "tuesday": "6:00 - 18:00",
                "saturday": "6:00 - 17:00",
                "thursday": "6:00 - 18:00",
                "wednesday": "6:00 - 18:00"
            },
    "City" : "Kaunas",
    "Street" : "Vytauto pr.",
    "Number" : "24",
    "routesNumber" : 50
}
```
## GET routes/list

**RESOURCES URL**
https://busparks.azurewebsites.net/api/parks/:id/routes

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/parks/2/routes

### Result

```javascript
[
    {
        "Id": 1,
        "parkId": 2,
        "Stops": "Kaunas,Antakalnis,Žiežmariai,Elektrėnai,Vievis,Vilnius",
        "International": false
    },
    {
        "Id": 2,
        "parkId": 2,
        "Stops": "Kaunas,Raudondvaris,Vilkija,Seredžius,Veliuona,Graužėnai,Raudonė,Kybartai Jurbarko r.,Vytėnai,Skirsnemunė,Rotuliai,Jurbarkas,Smalininkai,Viešvilė,Žukų kryžkelė,Vilkyškiai,Lumpėnai,Mikytai,Pagėgiai,Rukai,Stoniškiai,Usėnai,Juknaičiai,Šilutė,Saugos,Vilkyčiai,Priekulė,Klaipėda",
        "International": false
    },
    {
        "Id": 3,
        "parkId": 2,
        "Stops": "Kaunas,Marijampolė,Suvalkai",
        "International": true
    }
]
```
## GET routes/list

**RESOURCES URL**
https://busparks.azurewebsites.net/api/routes

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/routes

### Result

```javascript
[
    {
        "Id": 1,
        "parkId": 2,
        "Stops": "Kaunas,Antakalnis,Žiežmariai,Elektrėnai,Vievis,Vilnius",
        "International": false
    },
    {
        "Id": 2,
        "parkId": 2,
        "Stops": "Kaunas,Raudondvaris,Vilkija,Seredžius,Veliuona,Graužėnai,Raudonė,Kybartai Jurbarko r.,Vytėnai,Skirsnemunė,Rotuliai,Jurbarkas,Smalininkai,Viešvilė,Žukų kryžkelė,Vilkyškiai,Lumpėnai,Mikytai,Pagėgiai,Rukai,Stoniškiai,Usėnai,Juknaičiai,Šilutė,Saugos,Vilkyčiai,Priekulė,Klaipėda",
        "International": false
    },
    {
        "Id": 4,
        "parkId": 4,
        "Stops": "Kaunas-Garliava-Veiveriai-Marijampolė",
        "International": false
    }
]
```

## GET routes/single

**RESOURCES URL**
https://busparks.azurewebsites.net/api/parks/:parkId/routes/:id

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/routes/3

### Result

```javascript
{
    "Id": 3,
    "parkId": 2,
    "Stops": "Kaunas,Marijampolė,Suvalkai",
    "International": true
}
```


## DELETE routes/single

**RESOURCES URL**
DELETE https://busparks.azurewebsites.net/api/routes/:id

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND DELETE REQUEST** https://busparks.azurewebsites.net/api/routes/3

### Result
```javascript
{
    "Id": 3,
    "parkId": 2,
    "Stops": "Kaunas,Marijampolė,Suvalkai",
    "International": true
}
```


## POST routes/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/routes

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 201 | Created  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND POST REQUEST** https://busparks.azurewebsites.net/api/routes

```javascript
{
    "parkId": 4,
        "Stops": "Kaunas-Garliava-Veiveriai-Marijampolė",
        "International": false
}
```
### Result
```javascript
{
    "Id": 4,
    "parkId": 4,
    "Stops": "Kaunas-Garliava-Veiveriai-Marijampolė",
    "International": false
}
```
## PUT routes/single

**RESOURCES URL**
PUT https://busparks.azurewebsites.net/api/routes/:id

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND PUT REQUEST** https://busparks.azurewebsites.net/api/parks/11/routes/9

```javascript
{
    "StartTime" : "1970-01-01T02:04:00Z",
    "International" : false
}
```
### Result
```javascript
{
    "StartTime" : "1970-01-01T02:04:00Z",
    "International" : false
}
```

## GET busses/list

**RESOURCES URL**
https://busparks.azurewebsites.net/api/parks/:parkId/routes/:id/busses

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/parks/4/routes/1/busses

### Result

```javascript
[
    {
        "VIN": "4Y1SL65848Z51148",
        "routeId": 1,
        "NumberPlate": "AAA124",
        "Tech_Inspection": "2022-10-24T00:00:00.000Z",
        "Mileage": 5000000,
        "StandingSpaces": 0,
        "SittingSpaces": 33,
        "WC": true,
        "StartTime": "1970-01-01T14:30:00.000Z",
        "EndTime": "1970-01-01T17:30:00.000Z",
        "Late": false,
        "LateBy": null
    },
    {
        "VIN": "4Y1SL65848Z51149",
        "routeId": 1,
        "NumberPlate": "AAA123",
        "Tech_Inspection": "2022-10-24T00:00:00.000Z",
        "Mileage": 5000000,
        "StandingSpaces": 0,
        "SittingSpaces": 33,
        "WC": true,
        "StartTime": "1970-01-01T13:30:00.000Z",
        "EndTime": "1970-01-01T16:30:00.000Z",
        "Late": false,
        "LateBy": null
    }
]
```
## GET busses/list

**RESOURCES URL**
https://busparks.azurewebsites.net/api/parks/:parkId/routes/:id/busses

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/busses

### Result

```javascript
[
    {
        "VIN": "4Y1SL65848Z51148",
        "routeId": 1,
        "NumberPlate": "AAA124",
        "Tech_Inspection": "2022-10-24T00:00:00.000Z",
        "Mileage": 5000000,
        "StandingSpaces": 0,
        "SittingSpaces": 33,
        "WC": true,
        "StartTime": "1970-01-01T14:30:00.000Z",
        "EndTime": "1970-01-01T17:30:00.000Z",
        "Late": false,
        "LateBy": null
    },
    {
        "VIN": "4Y1SL65848Z51149",
        "routeId": 1,
        "NumberPlate": "AAA123",
        "Tech_Inspection": "2022-10-24T00:00:00.000Z",
        "Mileage": 5000000,
        "StandingSpaces": 0,
        "SittingSpaces": 33,
        "WC": true,
        "StartTime": "1970-01-01T13:30:00.000Z",
        "EndTime": "1970-01-01T16:30:00.000Z",
        "Late": false,
        "LateBy": null
    }
]
```
## GET busses/single

**RESOURCES URL**
https://busparks.azurewebsites.net/api/busses/:VIN

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not found  |

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://busparks.azurewebsites.net/api/busses/4Y1SL65848Z51149

### Result

```javascript
{
    "VIN": "4Y1SL65848Z51149",
    "routeId": 1,
    "NumberPlate": "AAA123",
    "Tech_Inspection": "2022-10-24T00:00:00.000Z",
    "Mileage": 5000000,
    "StandingSpaces": 0,
    "SittingSpaces": 33,
    "WC": true,
    "StartTime": "1970-01-01T13:30:00.000Z",
    "EndTime": "1970-01-01T16:30:00.000Z",
    "Late": false,
    "LateBy": null
}
```

## DELETE busses/single

**RESOURCES URL**
DELETE https://busparks.azurewebsites.net/api/busses/:VIN

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 200 | Ok  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND DELETE REQUEST** https://busparks.azurewebsites.net/api/busses/4Y1SL65848Z51149

### Result
```javascript
{
    "VIN": "4Y1SL65848Z51149",
    "routeId": 1,
    "NumberPlate": "AAA123",
    "Tech_Inspection": "2022-10-24T00:00:00.000Z",
    "Mileage": 5000000,
    "StandingSpaces": 0,
    "SittingSpaces": 33,
    "WC": true,
    "StartTime": "1970-01-01T13:30:00.000Z",
    "EndTime": "1970-01-01T16:30:00.000Z",
    "Late": false,
    "LateBy": null
}
```

## POST busses/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/busses

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 201 | Created  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |

## EXAMPLE REQUEST

**SEND POST REQUEST** https://busparks.azurewebsites.net/api/busses

```javascript
{
        "VIN": "4Y1SL65848Z51105",
        "routeId": 1,
        "NumberPlate": "AAA124",
        "Tech_Inspection": "2022-10-24T10:00:00.000Z",
        "Mileage": 5000000,
        "StandingSpaces": 0,
        "SittingSpaces": 33,
        "WC": true,
        "StartTime": "2022-10-24T14:30:00.000Z",
        "EndTime" : "2022-10-24T17:30:00.000Z",
        "Late" : false
}
```
### Result
```javascript
{
    "VIN": "4Y1SL65848Z51105",
    "routeId": 1,
    "NumberPlate": "AAA124",
    "Tech_Inspection": "2022-10-24T00:00:00.000Z",
    "Mileage": 5000000,
    "StandingSpaces": 0,
    "SittingSpaces": 33,
    "WC": true,
    "StartTime": "1970-01-01T14:30:00.000Z",
    "EndTime": "1970-01-01T17:30:00.000Z",
    "Late": false,
    "LateBy": null
}
```

## PUT busses/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/busses/:VIN

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND PUT REQUEST** https://busparks.azurewebsites.net/api/parks/11/routes/9/busses/19

```javascript
{
        "routeId": 2,
        "NumberPlate": "AAA123",
        "StandingSpaces": 0,
        "SittingSpaces": 50,
        "WC": true
}
```
### Result
```javascript
{
    "routeId": 2,
    "NumberPlate": "AAA123",
    "StandingSpaces": 0,
    "SittingSpaces": 50,
    "WC": true
}
```


## POST REGISTER user/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/users/register

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 201 | OK  |
| 500  | Internal Error  |
| 400  | Bad Request  |

## EXAMPLE REQUEST

**SEND POST REQUEST** https://busparks.azurewebsites.net/api/users/register

```javascript
{
    "Email" : "redniu@ktu.lt",
    "Username" : "Redas",
    "Password" : "supersecretpassword"
}
```
### Result
```javascript
{
    "Id": 13,
    "Email": "redniu@ttt.lt",
    "Username": "Redas",
    "Password": "$2b$08$rgu7YopietMKNyUjnMrC6eJFCi5RCL5Oe9Ty3GqTVHH/cD.LRr57S",
    "AccessLevel": 1
}
```

## POST LOGIN user/single

**RESOURCES URL**
POST https://busparks.azurewebsites.net/api/users/login

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 200 | OK |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unautorized  |


## EXAMPLE REQUEST

**SEND POST REQUEST** https://busparks.azurewebsites.net/api/users/login

```javascript
{
    "password": "test",
    "email": "something@gmail.com"
}
```
### Result
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoicmVkbml1QHR0dC5sdCIsIkFjY2Vzc0xldmVsIjoxLCJpYXQiOjE2NzE4MzUyNzAsImV4cCI6MTY3MTgzODg3MH0.09nA1nU189MSdyq881f8PUC5bjHpNL7kxALNnKJogG4"
```

# Išvados
Išmokta kurti struktūrizuotus API pagal RESTful metodiką. Susipažinta su autentifikavimo ir autorizavimo svarba svetainėse. Vartotojo sąsaja parodė, kad yra daug vietų kur galimos klaidos, norimi pataisymai. Tai parodo modeliavimo svarbą projekto ankstyvose stadijose.
Pabaigoje sukurtas dalinai išpildytas produktas autobusų parkams su galimybių bei funkcionalumai plėtra. 