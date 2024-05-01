const { MongoClient } = require('mongodb');

async function connectToDB() {
    const uri = "mongodb+srv://dhruv999ddrr:<ZwOdWRyfOkJKRw3r>@dhruv1.ajjm5my.mongodb.net/?retryWrites=true&w=majority&appName=Dhruv1";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        // Further database operations can go here
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close();
    }
}

connectToDB();
