import { useEffect , useState } from 'react'
import { mockApplications } from './data/mockApplications';
import type { Status } from "./types/application";
import Header from './Header';


const STORAGE_KEY = "job-tracker-apps";


export default function App() {

  const columns = [
    { title: "Wishlist", status: "WISHLIST" },
    { title: "Applied", status: "APPLIED" },
    { title: "Interview", status: "INTERVIEW" },
    { title: "Offer", status: "OFFER" },
    { title: "Rejected", status: "REJECTED" },
  ] as const;

  const [app, setApp] = useState(() => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return mockApplications;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : mockApplications;
  } catch {
    return mockApplications;
  }
});

  const [isOpen, setIsOpen] = useState(false)

  function toggleAddApplication() {
    setIsOpen((prev) => !prev)
  }

  const [draft, setDraft] = useState({
    company: "",
    role: "",
    status: "APPLIED" as Status,
  });

  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
}, [app]);
  return (
    <>
      <div className="min-h-dvh  bg-white mb-20" >
        <Header />
        {isOpen ?
          <>
            <div className='text-center'>
              <button
                onClick={toggleAddApplication}
                className='pl-4 pr-4 pt-2 pb-2  text-white bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md mt-10 '>Close x</button>
            </div>
            <div className='flex justify-center   m-10'>

              <form
                
                className="flex flex-col p-8 rounded-2xl shadow-lg max-w-[350px] gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submitted");

                  if (draft.company.trim()!=="" && draft.role.trim()!==""){
                    const newItem = {
                      id: crypto.randomUUID(),
                      company: draft.company,
                      role:draft.role,
                      status:draft.status,
                      dateApplied: new Date().toISOString()
                      

                      
                    }
                    console.log(" if submitted");
                    setApp((prev)=>[newItem, ...prev])
                    setDraft({ company:"", role:"", status:"APPLIED" })
                    setIsOpen(false)
                  }
                }}
              >
                <label>Company</label>
                <input
                  type="text"
                  value={draft.company}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, company: e.target.value }))
                  }
                  className="border rounded-sm pl-2"
                />

                <label>Role</label>
                <input
                  type="text"
                  value={draft.role}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="border rounded-sm pl-2"
                />

                <label>Status</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, status: e.target.value as Status }))
                  }
                  className="border rounded-sm pl-2"
                >
                  {columns.map((c) => (
                    <option key={c.status} value={c.status}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <button
                  className="text-white rounded-sm bg-blue-500 shadow-lg shadow-blue-500/50 mt-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>

            </div>
          </>
          :
          <div className='text-center'>
            <button
              onClick={toggleAddApplication}
              className='pl-4 pr-4 pt-2 pb-2 text-white  bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md mt-10 mb-10'>Add +</button>
          </div>}


        <div className="flex gap-6 justify-center">

          {columns.map(
            (col) => {
              const filteredApps = app.filter(
                (app) => app.status === col.status
              ); return (
                <div key={col.status} className="min-w-55 shadow-lg mt-5 border border-[#3a3a3a18] rounded-xl p-3">
                  <h3 className='font-bold'>{col.title} {filteredApps.length}</h3>
                  <div className="mt-5 ">
                    {filteredApps.map((app) => (
                      <div key={app.id} className='border  border-[#42424422] rounded-lg p-2 mt-3'>
                        <div className="font-semibold">{app.company}</div>
                        <div className="text-sm opacity-50">{app.role}</div>
                        <div className="text-sm">{new Date(app.dateApplied).toLocaleDateString()}</div>

                        <select
                          name="status"
                          value={app.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as Status;

                            setApp((prev) =>
                              prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
                            );
                          }}

                          className="mt-2 w-full border border-[#42424422] rounded p-1"
                        >
                          {columns.map((c) => (
                            <option key={c.status} value={c.status}>
                              {c.title}
                            </option>
                          ))}
                        </select>

                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          )}

        </div>
      </div>
    </>
  )
}