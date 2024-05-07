import mongoose from "mongoose";
import { randomUUID } from "crypto";
// create chatSchema
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
// export model
export default mongoose.model("Chat", chatSchema);
//# sourceMappingURL=chatModel.js.map