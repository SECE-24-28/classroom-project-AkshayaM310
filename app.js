const { MongoClient, ObjectId}= require('mongodb');
const url='mongodb://localhost:27017/';
const dbName='mydatabase';
const collectionName='crudOperation';
const client= new MongoClient(url);
async function main() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 1. CREATE
        //InsertOne
        console.log('\n--- INSERT OPERATION ---');
        const newUser = { name: 'ALice', email: 'alice@example.com', age: 30 };
        const insertResult = await collection.insertOne(newUser);
        console.log(collection)
        console.log('Inserted document:', insertResult.insertedId);

        // InsertMany
        const multipleUsers = [
            { name: 'kate', email: 'kate@example.com', age: 25 },
            { name: 'Bob', email: 'bob@example.com', age: 35 }
        ];
        const insertManyResult = await collection.insertMany(multipleUsers);
        console.log('Inserted multiple documents:', insertManyResult.insertedCount);


        // 2. READ 
        console.log('\n--- READ OPERATION ---');

        // Find all documents
        const allUsers = await collection.find({}).toArray();
        console.log('All users:', allUsers);

        // Find one document
        const oneUser = await collection.findOne({ name: 'Alice' });
        console.log('Found user:', oneUser);

        // Find with filter
        const filteredUsers = await collection.find({ age: { $gte: 30 } }).toArray();
        console.log('Users aged 30 or more:', filteredUsers);


        // 3. UPDATE 
        console.log('\n--- UPDATE OPERATION ---');

        // Update one document
        const updateResult = await collection.updateOne({name:'Alice'},{$set:{age:31,city:'New York'}});
        console.log('Updated documents count:', updateResult.modifiedCount);

        // Update multiple documents
        const updateManyResult = await collection.updateMany({age:{$lt:30}},{$set:{status:'young'}});
        console.log('Updated multiple documents:', updateManyResult.modifiedCount);


    } 
    catch (error) 
    {
        console.error('Error:', error);
    } 
    finally 
    {
        // Close the connection
        await client.close();
        console.log('\nConnection closed');
    }
}
// call the main function
main();