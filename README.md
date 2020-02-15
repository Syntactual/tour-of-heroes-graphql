# Tour of Heroes Graphql

The is a clone of the Tour of Heroes tutorial on Angular.io. 

This is an example of how to implement GraphQL with Angular using Apollo Angular (https://www.apollographql.com/docs/angular/). 
I used schema link to utilize a local graphql server. 
This allows a fast implementation and the developers will see benefits of using graphql right away.

This type of implementation strategy can be used to help a client see the benefits of the technology without having to get buy in from the backend team.

I used Code Gen (https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) to generate the Static types and Document nodes.

To run the application clone and run npm install and then use ng serve.

If you change the schema or any of the graphql files run npm run generate to run code gen.

To migrate the server to a remote location take the schema and resolvers out and move them to the remote server. The http calls should also be moved to that server as well. 


