import { saveAs } from 'file-saver';
import authServiceInstance from "@/service/auth.service";
import { nanoid } from 'nanoid';
import { notifyError, notifySuccess } from "./alert";
import { encrypToken } from './utils';
export const summarizePDF = async () => {
  try {
    // const user = authServiceInstance.getUserInfo();
    const id = localStorage.getItem('uid')
    let threadID = localStorage.getItem('threadId')
    if (threadID == null) {
      threadID = nanoid();
      localStorage.setItem('threadId', threadID)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize`, {
      method: 'POST', // or another method if required by your backend
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: id,
        thread_id: threadID
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      saveAs(blob, 'TalkHealthSummary.pdf');
    } else {
      console.error('Failed to download PDF:', response.statusText);
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }

};

export async function postMessage(message, imgURL, emit, type) {
  // const user = authServiceInstance.getUserInfo();
  const id = localStorage.getItem('uid')
  let threadID = localStorage.getItem('threadId');
  if (threadID == null) {
    threadID = nanoid();
    localStorage.setItem('threadId', threadID)
  }
  emit("START", "", threadID)
  try {
    const ciphertext = encrypToken(threadID);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${ciphertext}`
          // Add other headers as needed
        },
        // responseType: "stream",
        body: JSON.stringify({
          message: message,
          img: imgURL ? imgURL : "",
          type: type,
          uid: id || "",
          thread_id: threadID
        }),
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let finalData = "";

    reader.read().then(async function processStream({ done, value }) {
      if (done) {
        // await insertMessage(chatID, message, finalData)
        emit("END", "", threadID);
        // console.log("here", await reader.read());
        return;
      }

      const dataStrings = decoder.decode(value).split("data: ").filter(Boolean);
      // Value is a Uint8Array
      // You'll want to process this, parsing JSON strings as necessary and adding them to state
      dataStrings.forEach(async (data) => {
        try {
          const parsedData = JSON.parse(data);
          // console.log(parsedData["token"]);
          // await setAnswer((prevMessages) => prevMessages + parsedData["token"]);
          if (parsedData["token"].startsWith("pr0mpt")) {
            // string without the pr0mpt
            const message = parsedData["token"].slice(6);

            // console.log(message, 'from API')

            emit("PROMPTS", message, threadID);
            emit("END", "", threadID);
            return;
          }
          emit("MESSAGE", parsedData["token"], threadID);

          finalData = finalData + parsedData["token"];
          // sleep(1000)
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      });
      // Read more stream data
      return reader.read().then(processStream);
    });
  } catch (error){
    // await setAnswer("Network error occured");
    emit("MESSAGE", "Network error occured", threadID);
    emit("END", "", threadID);
    return;
  }
}

export async function freepostMessage(message, imgURL, emit, type, ipadd) {
  emit("START", "", ipadd);
  try {
    
    const ciphertext = encrypToken(ipadd);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${ciphertext}`
          // Add other headers as needed
        },
        // responseType: "stream",
        body: JSON.stringify({
          message: message,
          img: imgURL,
          type: type,
          uid: ipadd,
          thread_id: ipadd
        }),
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let finalData = "";

    reader.read().then(async function processStream({ done, value }) {
      if (done) {
        // await insertMessage(chatID, message, finalData)
        emit("END", "", ipadd);
        // console.log("here", await reader.read());
        return;
      }

      const dataStrings = decoder.decode(value).split("data: ").filter(Boolean);
      // Value is a Uint8Array
      // You'll want to process this, parsing JSON strings as necessary and adding them to state
      dataStrings.forEach(async (data) => {
        try {
          const parsedData = JSON.parse(data);
          // console.log(parsedData["token"]);
          // await setAnswer((prevMessages) => prevMessages + parsedData["token"]);
          if (parsedData["token"].startsWith("pr0mpt")) {
            // string without the pr0mpt
            const message = parsedData["token"].slice(6);

            // console.log(message, 'from API')

            emit("PROMPTS", message, ipadd);
            emit("END", "", ipadd);
            return;
          }
          emit("MESSAGE", parsedData["token"], ipadd);

          finalData = finalData + parsedData["token"];
          // sleep(1000)
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      });
      // Read more stream data
      return reader.read().then(processStream);
    });
  } catch {
    // await setAnswer("Network error occured");
    emit("MESSAGE", "Network error occured", ipadd);
    emit("END", "", ipadd);
    return;
  }
}

export async function sendFeedback(rating, feedback) {
  try {
    // const user = authServiceInstance.getUserInfo();
    const displayName = localStorage.getItem('fullName')
    const id = localStorage.getItem('uid')
    const email = localStorage.getItem('email')
    let threadID = localStorage.getItem('threadId');
    if (threadID == null) {
      threadID = nanoid();
      localStorage.setItem('threadId', threadID)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
      method: 'POST', // or another method if required by your backend
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: id,
        email: email,
        displayName: displayName,
        feedback: feedback,
        rate: rating,
        thread_id: threadID
      }),
    });
    if (response.ok) {
      notifySuccess("Feedback has sent successfully");
      return true;
    } else {
      notifyError('Error has occured');
      return false;
    }
  } catch (error) {
    notifyError('Error has occured');
    return false;
  }
}

export async function getHistory() {
  try {
    // const user = authServiceInstance.getUserInfo();
    const id = localStorage.getItem('uid')
    const response = await fetch(`/api/getHistory`, {
      method: 'POST', // or another method if required by your backend
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: id
      }),
    });
    if (response.ok) {
      const datas = await response.json();
      return datas; // return data from function
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function sendContact(name, mail, message) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: 'POST', // or another method if required by your backend
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        message: message
      }),
    });

    if (response.ok) {
      notifySuccess("Contact has sent successfully");
    } else {
      notifyError('Error has occured')
    }
  } catch (error) {
    notifyError('Error has occured')
    // console.error('Error:', error);
  }
}

export async function deleteThread(threadId) {
  const response = await fetch('/api/thread', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ threadId }),
  });

  return response;
}

export async function renameThread(threadId, newName) {
  const response = await fetch('/api/thread', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ threadId, newName }),
  });

  if (!response.ok) {
    throw new Error('Failed to rename the thread.');
  }

  const data = await response.json();
}
