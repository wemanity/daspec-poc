> **In da spec:** executed: 39, passed: 36, failed: 3

# This spec describes how acounts are handled
>===========================================


# Foreword on this spec
>---------------------

> *Protip:* you should directly test the piece of code that handles each
> rule described below.
> Do not try to test the whole APP, it will make your life hellish: it
> will be harder, less maintainable, and the tests will be slow.
>
> You'll find out that this is actually easy if you develop the code
> **after** the test (Test First): naturally, your code and design will
> match the concepts described in the rules, and the piece of code we
> want to test will be nicely isolated. This is exactly what we want!
>
> On the other hand, if you wander to write the code **before** the test
> (*this is baaaaad*!) then the code and design will propably won't be
> that easy to test, the business concepts may not appear as so clearly
> defined. As a result, your only options will be to write dubious code
> to make the tests run, thus testing way too much code, and making the
> test brittle and slow.
> Or, much better, you'll have to refactor the code until you end up
> with something like what you'd get if you had started with the
> test... :-)
>
> *Got it!?* Right, let's go on with the rules, then...


# Password sanity-check
>---------------------
> When the user creates an account, he is requested to enter a password
> to secure its account.

> The password must be between 8 and 15 characters-long.
> It must contain at least one number, one lower-case character and one
> upper-case character.
> It can contain ponctuations and special characters but no accentuated
> characters.

* Creating an account with 12345678Ok as password must be **accepted**.
* Creating an account with Sh0rt as password must be **rejected**.
* Creating an account with M1nL3ngt as password must be **accepted**.
* Creating an account with Loo1234567890ong as password must be **rejected**.
* Creating an account with Max123456Length as password must be **accepted**.
* Creating an account with NoNumber as password must be **rejected**.
* Creating an account with nocaps12345 as password must be **rejected**.
* Creating an account with ALLCAPS12345 as password must be **rejected**.
* Creating an account with Pu1\.;,?\!:/_ as password must be **accepted**.
* Creating an account with P@$£\*%§\#"~&a2 as password must be **~~accepted~~ [rejected]**.

* Creating an account with \(\[\]\)=\+@ 2Gh^~ as password must be accepted.

* Creating an account with ¨'\`|Fss321 as password must be **~~accepted~~ [rejected]**.
* Creating an account with F0rb1ddenè as password must be **rejected**.
* Creating an account with àF0rb1dden as password must be **rejected**.
* Creating an account with f0rçb1DDen as password must be **rejected**.
* Creating an account with f0rb1DDén as password must be **rejected**.
* Creating an account with f0rbùDDen as password must be **rejected**.
* Creating an account with NoUn1code∞ as password must be **rejected**.

> The password must be entered twice before the account is created.

* Creating an account with val1dP8ssw0rd as password and n0tTh3S8mE as confirmation must be **rejected**.
* Creating an account with val1dP8ssw0rd as password and val1dP8ssw0rd as confirmation must be **accepted**.
* Creating an account with sImilar1 as password and sImilar2 as confirmation must be **rejected**.


# Account Information
>-------------------

> The user is requested to enter a set of information when creating an
> account.
> Personal information are optional for free accounts, and required for
> Premium accounts, while login, password and account type are always
> mandatory.

>A user can create a new account:

| Account Type   | Acount Name   | Password       | First Name   | Last Name   | Birth Date   | Creation allowed                                                                                       |
| -------------- | ------------- | -------------- | ------------ | ----------- | ------------ | **~~-----------------------------------------------------------------------~~ [Password is required]** |
| Free           | GreatClown    | 1mZeB8st       | Bozo         | The Clown   | 03/13/1930   | **yes**                                                                                                |
| Free           | GreatClown    | 1mZeB8st       |              | The Clown   | 03/13/1930   | **yes**                                                                                                |
| Free           | GreatClown    | 1mZeB8st       | Bozo         |             | 03/13/1930   | **yes**                                                                                                |
| Free           | GreatClown    | 1mZeB8st       | Bozo         | The Clown   |              | **yes**                                                                                                |
| Free           | GreatClown    | 1mZeB8st       |              |             |              | **yes**                                                                                                |
| Premium        | GreatClown    | 1mZeB8st       | Bozo         | The Clown   | 03/13/1930   | **yes**                                                                                                |
| Premium        | GreatClown    | 1mZeB8st       |              | The Clown   | 03/13/1930   | **Premium users must provide first name, last name and birth date**                                    |
| Premium        | GreatClown    | 1mZeB8st       | Bozo         |             | 03/13/1930   | **Premium users must provide first name, last name and birth date**                                    |
| Premium        | GreatClown    | 1mZeB8st       | Bozo         | The Clown   |              | **Premium users must provide first name, last name and birth date**                                    |
| Premium        | GreatClown    | 1mZeB8st       |              |             |              | **Premium users must provide first name, last name and birth date**                                    |
| Free           |               |                | Bozo         | The Clown   | 03/13/1930   | **Account Name is required**                                                                           |
| Premium        |               |                | Bozo         | The Clown   | 03/13/1930   | **Account Name is required**                                                                           |
| Free           | GreatClown    |                | Bozo         | The Clown   | 03/13/1930   | **Password is required**                                                                               |
| Premium        | GreatClown    |                | Bozo         | The Clown   | 03/13/1930   | **Password is required**                                                                               |
| Free           |               | 1mZeB8st       | Bozo         | The Clown   | 03/13/1930   | **Account Name is required**                                                                           |
| Premium        |               | 1mZeB8st       | Bozo         | The Clown   | 03/13/1930   | **Account Name is required**                                                                           |
| Free           |               |                |              |             |              | **Account Name is required**                                                                           |
| Premium        |               |                |              |             |              | **Account Name is required**                                                                           |


# Acount name sanity-check
>------------------------

> For later!!! No check yet. We could check it is a valid e-mail
> address, or something like that :-)
> At the very least, we could check for the max length.


# Account information
>-------------------

> When logged in, a user can check its information.
> TODO : test checking all the information displayed to the user.
> First Name, Last Name, Account Name, Birth Date, Account Type, Account Expiry Date, Content List
