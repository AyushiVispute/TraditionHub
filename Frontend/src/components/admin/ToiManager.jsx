import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getTois, adminCreateToi, adminUpdateToi, adminDeactivateToi, adminRescoreAll } from '../../services/toiApi';
import ToiFormModal from '../../components/admin/ToiFormModal';

/**
 * Admin screen for managing Topics of Interest. Route this at /admin/tois
 * and link it from your AdminDashboard.
 */
export default function ToiManager() {
  const [tois, setTois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(undefined); // undefined = closed, null = create, object = edit
  const [saving, setSaving] = useState(false);
  const [rescoring, setRescoring] = useState(false);

  const load = async () => {
  setLoading(true);

  try {
    const data = await getTois();

    console.log("TOI API response:", data);

    if (Array.isArray(data)) {
      setTois(data);
    } else if (Array.isArray(data.tois)) {
      setTois(data.tois);
    } else {
      console.error("Unexpected TOI response:", data);
      setTois([]);
      toast.error("Invalid TOI data received");
    }
  } catch (err) {
    console.error("Failed to load TOIs:", err);
    setTois([]);
    toast.error("Failed to load topics");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editing && editing._id) {
        const { rescored } = await adminUpdateToi(editing._id, payload);
        toast.success(`Topic updated. Re-scored ${rescored.updated} places.`);
      } else {
        const { rescored } = await adminCreateToi(payload);
        toast.success(`Topic created. Scored ${rescored.updated} places against it.`);
      }
      setEditing(undefined);
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save topic');
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (toi) => {
    if (!confirm(`Deactivate "${toi.name}"? It will stop appearing in recommendations and the planner.`)) return;
    try {
      await adminDeactivateToi(toi._id);
      toast.success('Topic deactivated');
      await load();
    } catch {
      toast.error('Failed to deactivate topic');
    }
  };

  const handleRescoreAll = async () => {
    if (!confirm('Re-score every place against every active topic? This may take a while for a large catalog.')) return;
    setRescoring(true);
    try {
      const result = await adminRescoreAll();
      toast.success(`Re-scored ${result.updated}/${result.total} places against ${result.toiCount} topics.`);
    } catch {
      toast.error('Rescore failed');
    } finally {
      setRescoring(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Topics of Interest</h1>
          <p className="text-gray-500 text-sm">
            Manage the categories used to score places and match user preferences.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRescoreAll}
            disabled={rescoring}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm"
          >
            {rescoring ? 'Re-scoring...' : 'Re-score all places'}
          </button>
          <button
            onClick={() => setEditing(null)}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 text-sm"
          >
            + New topic
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading...</div>
      ) : tois.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No topics yet. Create your first one.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {tois.map((toi) => (
            <div key={toi._id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                {toi.icon && <span className="text-xl">{toi.icon}</span>}
                <div>
                  <div className="font-medium text-gray-800">{toi.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{toi.description}</div>
                  {toi.keywords?.length > 0 && (
                    <div className="text-xs text-gray-400 mt-0.5">{toi.keywords.join(' · ')}</div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(toi)}
                  className="px-3 py-1.5 rounded-lg text-sm text-orange-600 hover:bg-orange-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeactivate(toi)}
                  className="px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-50"
                >
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== undefined && (
        <ToiFormModal
          initial={editing}
          saving={saving}
          onClose={() => setEditing(undefined)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}