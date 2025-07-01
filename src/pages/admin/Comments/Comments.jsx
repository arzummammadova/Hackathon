import React, { useState } from 'react';
import { FiSearch, FiCheck, FiX, FiMessageSquare, FiMoreVertical, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminComments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const commentsPerPage = 3;

  const comments = [
    {
      id: 1,
      user: 'Əli Hüseynov',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2 gün əvvəl',
      status: 'pending',
      content: 'Bu çox gözəl bir otaqdır! Yenə qalmaq istəyərdim.',
      room: 'Lüks Otaq 1',
      rating: 4,
      replies: [],
      likes: 12,
      isFeatured: false
    },
    {
      id: 2,
      user: 'Aygün Əliyeva',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '3 gün əvvəl',
      status: 'approved',
      content: 'Xidmət çox yaxşı idi, işçilər çox mehribandırlar.',
      room: 'Standart Otaq 2',
      rating: 5,
      replies: [],
      likes: 25,
      isFeatured: true
    },
    {
      id: 3,
      user: 'Vüsal Məmmədov',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      date: '5 gün əvvəl',
      status: 'rejected',
      content: 'Otaq təmiz deyildi, narazı qaldım.',
      room: 'VIP Otaq 1',
      rating: 2,
      replies: [],
      likes: 3,
      isFeatured: false
    },
    {
      id: 4,
      user: 'Leyla Qurbanova',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      date: '1 həftə əvvəl',
      status: 'approved',
      content: 'Mənzil mərkəzə yaxın idi, çox rahat idi.',
      room: 'Aile Otağı 3',
      rating: 4,
      replies: [],
      likes: 18,
      isFeatured: true
    },
    {
      id: 5,
      user: 'Rəşad İbrahimov',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      date: '2 həftə əvvəl',
      status: 'pending',
      content: 'Qiymətə görə çox yaxşı otaq idi, təşəkkürlər!',
      room: 'Ekonom Otaq 4',
      rating: 5,
      replies: [],
      likes: 30,
      isFeatured: false
    },
    {
      id: 6,
      user: 'Nərminə Həsənova',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      date: '3 həftə əvvəl',
      status: 'approved',
      content: 'Çox rahat yataq və gözəl mənzərə. Çox təşəkkür edirik!',
      room: 'Lüks Otaq 2',
      rating: 5,
      replies: [],
      likes: 42,
      isFeatured: true
    }
  ];

  const filterComments = () => {
    let filtered = [...comments];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(comment =>
        comment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.room.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'featured') {
        filtered = filtered.filter(comment => comment.isFeatured);
      } else if (activeFilter === 'popular') {
        filtered = filtered.filter(comment => comment.likes >= 20);
      } else {
        filtered = filtered.filter(comment => comment.status === activeFilter);
      }
    }
    
    return filtered;
  };

  const filteredComments = filterComments();

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handleStatusChange = async (id, newStatus) => {
    const result = await Swal.fire({
      title: 'Əminsiniz?',
      text: `Bu şərhi ${newStatus === 'approved' ? 'təsdiqləmək' : 'rədd etmək'} istədiyinizə əminsiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli',
      cancelButtonText: 'Xeyr'
    });

    if (result.isConfirmed) {
      Swal.fire(
        'Uğurlu!',
        `Şərh ${newStatus === 'approved' ? 'təsdiqləndi' : 'rədd edildi'}`,
        'success'
      );
      // In a real app, you would update the backend here
      console.log(`Changed status of comment ${id} to ${newStatus}`);
    }
  };

  const handleFeaturedToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const result = await Swal.fire({
      title: 'Əminsiniz?',
      text: `Bu şərhi ${newStatus ? 'seçilmişlərə əlavə etmək' : 'seçilmişlərdən çıxarmaq'} istədiyinizə əminsiniz?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli',
      cancelButtonText: 'Xeyr'
    });

    if (result.isConfirmed) {
      Swal.fire(
        'Uğurlu!',
        `Şərh ${newStatus ? 'seçilmişlərə əlavə edildi' : 'seçilmişlərdən çıxarıldı'}`,
        'success'
      );
      console.log(`Toggled featured status of comment ${id} to ${newStatus}`);
    }
  };

  const handleReplySubmit = (commentId) => {
    if (!replyText.trim()) return;
    
    // In a real app, you would send this to the backend
    console.log(`Replying to comment ${commentId}: ${replyText}`);
    
    Swal.fire(
      'Göndərildi!',
      'Cavabınız uğurla göndərildi',
      'success'
    );
    
    setReplyText('');
    setSelectedComment(null);
  };

  const statusColors = {
    approved: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-amber-100 text-amber-800',
    rejected: 'bg-rose-100 text-rose-800',
    featured: 'bg-purple-100 text-purple-800'
  };

  const statusIcons = {
    approved: <FiCheck className="mr-1" />,
    pending: <FiClock className="mr-1" />,
    rejected: <FiX className="mr-1" />,
    featured: <FiStar className="mr-1" />
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-800">Şərhlərin İdarəsi</h2>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Şərh axtar..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setActiveFilter('approved')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center ${activeFilter === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
            >
              <FiCheck className="mr-1" /> Təsdiqlənmiş
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center ${activeFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
            >
              <FiClock className="mr-1" /> Gözləmədə
            </button>
            <button
              onClick={() => setActiveFilter('rejected')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center ${activeFilter === 'rejected' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}`}
            >
              <FiX className="mr-1" /> Rədd edilmiş
            </button>
            <button
              onClick={() => setActiveFilter('featured')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center ${activeFilter === 'featured' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              <FiStar className="mr-1" /> Seçilmişlər
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center ${activeFilter === 'popular' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
            >
              <FiTrendingUp className="mr-1" /> Populyar
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {currentComments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Heç bir şərh tapılmadı</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentComments.map((comment) => (
              <div key={comment.id} className={`border border-gray-100 p-5 rounded-xl hover:shadow-sm transition-shadow ${comment.isFeatured ? 'border-l-4 border-l-purple-500' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={comment.avatar} 
                      alt={comment.user} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{comment.user}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{comment.date}</span>
                        <span className="mx-2">•</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-rose-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {comment.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {comment.isFeatured && (
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center ${statusColors.featured}`}>
                        {statusIcons.featured}
                        Seçilmiş
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center ${statusColors[comment.status]}`}>
                      {statusIcons[comment.status]}
                      {comment.status === 'approved' ? 'Təsdiqləndi' : 
                       comment.status === 'pending' ? 'Baxılır' : 'Rədd edildi'}
                    </span>
                    <button 
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      onClick={() => {
                        setSelectedComment(selectedComment === comment.id ? null : comment.id);
                        setReplyText('');
                      }}
                    >
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3 pl-13">{comment.content}</p>
                
                {/* Display existing replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-13 mb-3">
                    {comment.replies.map((reply, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p className="text-gray-700">{reply}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center pl-13">
                  <span className="text-sm text-gray-500">Otaq: {comment.room}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleStatusChange(comment.id, 'approved')}
                      className={`px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 flex items-center text-sm transition-colors ${comment.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={comment.status === 'approved'}
                    >
                      <FiCheck className="mr-1" /> Təsdiqlə
                    </button>
                    <button 
                      onClick={() => handleStatusChange(comment.id, 'rejected')}
                      className={`px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 flex items-center text-sm transition-colors ${comment.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={comment.status === 'rejected'}
                    >
                      <FiX className="mr-1" /> Rədd Et
                    </button>
                    <button 
                      onClick={() => handleFeaturedToggle(comment.id, comment.isFeatured)}
                      className={`px-3 py-1.5 ${comment.isFeatured ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'} rounded-lg flex items-center text-sm transition-colors`}
                    >
                      <FiStar className="mr-1" /> {comment.isFeatured ? 'Seçilmişdən çıxar' : 'Seçilmiş et'}
                    </button>
                    <button 
                      onClick={() => setSelectedComment(selectedComment === comment.id ? null : comment.id)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center text-sm transition-colors"
                    >
                      <FiMessageSquare className="mr-1" /> Cavab Ver
                    </button>
                  </div>
                </div>
                
                {selectedComment === comment.id && (
                  <div className="mt-3 pl-13">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Cavab yaz..."
                      rows="2"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2 space-x-2">
                      <button 
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => {
                          setSelectedComment(null);
                          setReplyText('');
                        }}
                      >
                        Ləğv et
                      </button>
                      <button 
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        onClick={() => handleReplySubmit(comment.id)}
                      >
                        Göndər
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <span className="text-sm text-gray-500">
          {filteredComments.length} şərh tapıldı, {currentPage}. səhifədə {currentComments.length} şərh göstərilir
        </span>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Əvvəlki
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-lg text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className={`px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Növbəti
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminComments;