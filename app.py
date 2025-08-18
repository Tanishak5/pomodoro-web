from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # front end requests

#data base for now
tasks = []

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"]) #flask auto adds /tasks to the end of the url
def add_task():
    data = request.json
    task = {
        "id": len(tasks) + 1,
        "title": data["title"],
        "done": False
    }
    tasks.append(task) #adds the new task to tasks array at the top
    return jsonify(task), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = request.json.get("done", task["done"])
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
