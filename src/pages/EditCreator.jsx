import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setFormData({
            name: data.name || '',
            url: data.url || '',
            description: data.description || '',
            imageURL: data.imageURL || ''
          });
        }
      } catch (error) {
        console.error('Error fetching creator:', error);
        alert('Error loading creator data');
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.url || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setUpdating(true);

    try {
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      
      navigate('/');
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Error updating creator. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this creator? This action cannot be undone.');
    
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      navigate('/');
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('Error deleting creator. Please try again.');
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <Link to="/" className="button secondary">← Back</Link>
      
      <h1>Edit Creator</h1>
      
      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter creator's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel/Page URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://youtube.com/@creator"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Tell us about this creator"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button primary" disabled={updating}>
            {updating ? 'Updating...' : 'Update Creator'}
          </button>
          <button 
            type="button" 
            className="button danger" 
            onClick={handleDelete}
          >
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;