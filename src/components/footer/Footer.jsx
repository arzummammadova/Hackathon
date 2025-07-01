import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Five sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 1</h3>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 2</h3>
            <ul>
              <li>Link 4</li>
              <li>Link 5</li>
              <li>Link 6</li>
            </ul>
          </div>
          {/* Section 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 3</h3>
            <ul>
              <li>Link 7</li>
              <li>Link 8</li>
              <li>Link 9</li>
            </ul>
          </div>
          {/* Section 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 4</h3>
            <ul>
              <li>Link 10</li>
              <li>Link 11</li>
              <li>Link 12</li>
            </ul>
          </div>
          {/* Section 5 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 5</h3>
            <ul>
              <li>Link 13</li>
              <li>Link 14</li>
              <li>Link 15</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
