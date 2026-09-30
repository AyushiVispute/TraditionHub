import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getTois, getPreferences, setPreferences } from '../../services/toiApi';
import ToiSlider from '../../components/preferences/ToiSlider';

export default function Preferences() {
  const [tois, setTois] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [toiList, existing] = await Promise.all([getTois(), getPreferences()]);
        setTois(toiList);
        const defaults = {};
        toiList.forEach((t) => {
          defaults[t.slug] = existing.toiPreferences?.[t.slug] ?? 5;
        });
        setValues(defaults);
      } catch (err) {
        toast.error('Could not load topics of interest');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (slug, val) => setValues((prev) => ({ ...prev, [slug]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await setPreferences(values);
      toast.success('Preferences saved!');
      navigate('/explore');
    } catch (err) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading topics...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">What interests you?</h1>
      <p className="text-gray-500 mb-6">
        Rate each topic 1–10. We'll use this to recommend places and build itineraries just for you.
      </p>

      <div className="bg-white rounded-xl shadow-sm px-4">
        {tois.map((toi) => (
          <ToiSlider key={toi.slug} toi={toi} value={values[toi.slug] ?? 5} onChange={handleChange} />
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save & Explore'}
      </button>
    </div>
  );
}