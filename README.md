## Contributor Roles


| Contributor      | Assigned Work                   |
| -----------      | -------------                   |
| @Bichitra-linux  | UI, page layouts                |
| @Onehealthpoint(sadik)  | Report Designing, api debugging |
| @KritanStha      | page layouts, fianalizing       |
| @kneatace(nitesh)        | package maintance, ui           |

## Note

we will be using firebase for Auth and Database

## Getting Started 

# first login to github from VS-code

[![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/signintogithub1.png)
]



# second, go to source control menu

[![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/gotosourcecontrol.png)
]

# click on clone repository

[![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/clicktoclonerepo.png)
]

# paste the repo link from github and enter

[![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/pastethelinkfromgithub.png)
]

# select a suitable location for cloning the repo

# lastly, the directories should look like this

[![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/aftercloning.png)]

# then, in source control repositories(dropdown) click on main to change or create a new branch

# you can also follow this video but not recommended
[![Tutorial Video](http://img.youtube.com/vi/SD7YNLv5Evc/0.jpg)](http://www.youtube.com/watch?v=SD7YNLv5Evc)

# then, create a new branch where you do the editing

# changing to or from another branch

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/changingorcreatingbranch.png)

# creating or choosing a new branch

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/chooseoptionstocreateanewbranchorpreviousbranch.png)


## AFTER MAKING SOME CHANGES TO THE REPO FOLLOW THE STEPS BELOW:



# after making some changes, goto source control tab you will see the list of changes to the files you have made, 

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/commitingchangestothebranch.png)

# if everything is running well and you are ready to update the repo you need to write a message so that others can analyze what changes you have made

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/writingacommitmessage.png)

# click "commit" it will take some time

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/syncingorpushingthecommit.png)


# after commiting sync changes (this will push your work to the repo)

![Example Image](https://github.com/bichitra-linux/unified_medical_system/blob/main/instructions%20to%20clone%20and%20commit/aftermakingchangestotherepo.png)

# if you dont want to commit a specific page you can stage other changes except that by clicking '+' of all other pages except that page 


## FOR CONNECTING THE REMOTE REPOSITORY (in terminal)(only use if you know how to because i don't,  lol!)
```bash

git remote add origin https://github.com/bichitra-linux/unified_medical_system.git

```

## running the development server:

```bash

#THIS PROJECT REQUIRES NODE V >=20.x.x and YARN v4.0.2 

# do this before starting
yarn set version berry
#
yarn config set nodeLinker node-modules
#
yarn install
# to add packages
yarn add
#then to start the server
yarn dev
#for upgrading the packages/plugins/extensions
yarn upgrade-interactive


```
for more about yarn and guide of using  it visit https://v3.yarnpkg.com


## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
