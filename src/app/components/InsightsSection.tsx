import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { articles } from "../data/articles";
import { useIsMobile } from "../hooks/useIsMobile";

export function InsightsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();
  const articlesPerPage = 3;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const currentArticles = articles.slice(
    currentPage * articlesPerPage,
    (currentPage + 1) * articlesPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#1a2840] via-[#16212e] to-[#1a2840] py-12 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="insightsGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1" fill="rgba(0,169,165,0.5)" />
              <line x1="0" y1="0" x2="50" y2="50" stroke="rgba(123,84,144,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#insightsGrid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#b89fd4]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4e8]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-4"
            >
              Latest Thinking
            </motion.p>
            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-5xl md:text-6xl mb-4"
            >
              Insights
            </motion.h2>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/50 text-lg max-w-2xl"
            >
              Practical strategies and industry knowledge to help your digital presence thrive
            </motion.p>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, x: 20 }}
            whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center gap-3"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                currentPage === 0
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-[#00d4e8]/50 text-[#00d4e8] hover:bg-[#00d4e8] hover:text-[#16212e]"
              }`}
              aria-label="Previous articles"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-[#00d4e8]/50 text-[#00d4e8] hover:bg-[#00d4e8] hover:text-[#16212e]"
              }`}
              aria-label="Next articles"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Articles grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={isMobile ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={isMobile ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={index >= 2 ? "hidden lg:block" : index >= 1 ? "hidden md:block" : ""}
                >
                  <Link
                    to={`/insights/${article.slug}`}
                    className="group block relative bg-[#1d2d3e]/60 backdrop-blur-sm border border-white/5 overflow-hidden hover:border-[#00d4e8]/30 transition-all duration-500 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d3e] via-transparent to-transparent opacity-60" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-sm tracking-wider uppercase px-3 py-1 bg-[#00d4e8] text-[#16212e]"
                        >
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-white/40 text-sm"
                        >
                          {article.date}
                        </span>
                        <span className="text-white/20">•</span>
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-white/40 text-sm"
                        >
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-white text-xl mb-3 group-hover:text-[#00d4e8] transition-colors duration-300 line-clamp-2"
                      >
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-1"
                      >
                        {article.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center gap-2 mt-auto">
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-[#00d4e8] text-sm tracking-wider uppercase"
                        >
                          Read Article
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#00d4e8] transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover border animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4e8] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-300 ${
                index === currentPage
                  ? "w-12 h-2 bg-[#00d4e8]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Mobile navigation arrows */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
              currentPage === 0
                ? "border-white/10 text-white/20 cursor-not-allowed"
                : "border-[#00d4e8]/50 text-[#00d4e8] hover:bg-[#00d4e8] hover:text-[#16212e]"
            }`}
            aria-label="Previous articles"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
              currentPage === totalPages - 1
                ? "border-white/10 text-white/20 cursor-not-allowed"
                : "border-[#00d4e8]/50 text-[#00d4e8] hover:bg-[#00d4e8] hover:text-[#16212e]"
            }`}
            aria-label="Next articles"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 30 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/insights"
            className="inline-flex items-center gap-3 border border-[#00d4e8] text-[#00d4e8] px-8 py-4 hover:bg-[#00d4e8] hover:text-[#16212e] transition-all duration-300 group"
          >
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="tracking-wide">
              View All Insights
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}